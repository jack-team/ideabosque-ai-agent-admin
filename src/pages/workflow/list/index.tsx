import qs from 'qs';
import { type FC, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import { App, Dropdown, type MenuProps, Space } from 'antd';
import { type ActionType } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, DuplicateIcon, AlertCircleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import { formatDate } from '@/utils';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { StatusEnum, StatusMap } from '@/constants/enum';
import TriggerModal from '@/components/TriggerModal';
import type { WorkflowDataType } from '@/typings/workflow';
import IconButton, { withIcon } from '@/components/IconButton';
import { workflowListApi, insertUpdateWorkflowApi } from '@/services/workflow';
import StatusTag from '@/components/StatusTag';
import { useLang } from '@/hooks/useLang';
import CreateForm from './createForm';
import EditForm from './editForm';
import { partId } from '@/env';

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WDuplicateIcon = withIcon(DuplicateIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const WorkflowList: FC = () => {
  const { t } = useLang();
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { flowName: val };
    onRefresh();
  });

  // 删除一条记录
  const onDeleteWorkflow = useMemoizedFn((record: WorkflowDataType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await insertUpdateWorkflowApi({
            updatedBy: partId,
            status: StatusEnum.Active,
            flowSnippetUuid: record.flowSnippetUuid,
          });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error('common.Failed to delete');
        }
      }
    });
  });

  // 复制一条记录
  const onDuplicate = useMemoizedFn(async (record: WorkflowDataType) => {
    const closeLoading = message.loading(t('common.loading'));
    await insertUpdateWorkflowApi({
      duplicate: true,
      updatedBy: partId,
      flowSnippetUuid: record.flowSnippetUuid,
    });
    onRefresh();
    closeLoading();
    message.success(t('common.Operation successful'));
  });

  const toDetail = useMemoizedFn((data: WorkflowDataType, isNew = true) => {
    const query = qs.stringify({
      editType: isNew ? 'new' : 'update',
      flowSnippetUuid: data.flowSnippetUuid,
      flowSnippetVersionUuid: data.flowSnippetVersionUuid
    });
    navigate(`/workflow/detail?${query}`);
  });

  return (
    <PageContainer
      title={t('workflow.workflows')}
      fullScreen
      extra={
        <Space>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template')}
          >
            {t('workflow.featuredTemplates')}
          </Button>
          <TriggerModal
            width={500}
            okText="Create"
            title={t('workflow.createWorkflow')}
            trigger={
              <Button type="primary">
                {t('workflow.createWorkflow')}
              </Button>
            }
          >
            <CreateForm onSaveSuccess={toDetail} />
          </TriggerModal>
        </Space>
      }
    >
      <Table<WorkflowDataType>
        actionRef={actionRef}
        cacheKey="WorkflowList"
        pagination={{
          defaultPageSize: 15
        }}
        request={params => {
          return workflowListApi({
            ...params,
            ...paramsRef.current,
            statuses: [StatusEnum.Active]
          });
        }}
        search={false}
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('workflow.workflow'),
          },
        }}
        rowKey="flowSnippetUuid"
        columns={[
          {
            title: t('workflow.workflow'),
            dataIndex: 'flowName',
          },
          {
            title: t('common.status'),
            dataIndex: 'status',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <StatusTag suatus={record.status}>
                  {t(StatusMap[record.status])}
                </StatusTag>
              );
            }
          },
          {
            title: t('common.createdAt'),
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: t('common.updatedAt'),
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: t('common.actions'),
            key: 'actions',
            align: 'center',
            fixed: 'right',
            hideInSearch: true,
            width: 120,
            render: (_, record) => {
              const items: MenuProps['items'] = [
                {
                  key: 'edit',
                  icon: <WEditIcon />,
                  label: t('workflow.editWorkflow'),
                  onClick: () => toDetail(record, false)
                },
                {
                  key: 'details',
                  label: (
                    <TriggerModal
                      title={t('workflow.workflowDetails')}
                      trigger={<span>{t('workflow.viewDetails')}</span>}
                    >
                      <EditForm
                        workflow={record}
                        onSaveSuccess={onRefresh}
                      />
                    </TriggerModal>
                  ),
                  icon: <WAlertCircleIcon />
                },
                {
                  key: 'duplicate',
                  label: t('workflow.duplicate'),
                  icon: <WDuplicateIcon />,
                  onClick: () => onDuplicate(record)
                },
                {
                  danger: true,
                  key: 'delete',
                  label: t('common.delete'),
                  icon: <WDeleteIcon />,
                  onClick: () => onDeleteWorkflow(record)
                }
              ];
              return (
                <Dropdown menu={{ items }} >
                  <IconButton icon={MenuHorizontalIcon} />
                </Dropdown>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default WorkflowList;