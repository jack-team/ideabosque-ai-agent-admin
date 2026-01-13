import qs from 'qs';
import { type FC, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import { App, Dropdown, type MenuProps, Space } from 'antd';
import { PageContainer, type ActionType } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, DuplicateIcon, AlertCircleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import { formatDate } from '@/utils';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { StatusEnum } from '@/constants/enum';
import TriggerModal from '@/components/TriggerModal';
import type { WorkflowDataType } from '@/typings/workflow';
import IconButton, { withIcon } from '@/components/IconButton';
import { workflowListApi, insertUpdateWorkflowApi } from '@/services/workflow';
import StatusTag from '@/components/StatusTag';
import CreateForm from './createForm';
import EditForm from './editForm';
import { partId } from '@/env';

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WDuplicateIcon = withIcon(DuplicateIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const WorkflowList: FC = () => {
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
      title: 'Are you sure you want to archive?',
      okText: 'Archive',
      onOk: async () => {
        try {
          await insertUpdateWorkflowApi({
            updatedBy: partId,
            status: StatusEnum.Active,
            flowSnippetUuid: record.flowSnippetUuid,
          });
          onRefresh();
          message.success('Archiving succeeded');
        } catch (err) {
          message.error('Archiving failed');
        }
      }
    });
  });

  // 复制一条记录
  const onDuplicate = useMemoizedFn(async (record: WorkflowDataType) => {
    const closeLoading = message.loading('Loading..');
    await insertUpdateWorkflowApi({
      duplicate: true,
      updatedBy: partId,
      flowSnippetUuid: record.flowSnippetUuid,
    });
    closeLoading();
    onRefresh();
    message.success('Operation successful');
  });

  return (
    <PageContainer
      title="Workflows"
      extra={
        <Space>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template')}
          >
            Featured templates
          </Button>
          <TriggerModal
            width={500}
            okText="Create"
            title="Create workflow"
            trigger={
              <Button type="primary">
                Create workflow
              </Button>
            }
          >
            <CreateForm />
          </TriggerModal>
        </Space>
      }
    >
      <Table<WorkflowDataType>
        actionRef={actionRef}
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
            placeholder: 'Workflow',
          },
        }}
        rowKey="flowSnippetUuid"
        columns={[
          {
            title: 'Workflow',
            dataIndex: 'flowName',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <StatusTag suatus={record.status}>
                  {record.status}
                </StatusTag>
              );
            }
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: 'Last updated',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: 'Actions',
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
                  label: 'Edit workflow',
                  onClick: () => {
                    const query = qs.stringify({
                      flowSnippetUuid: record.flowSnippetUuid,
                      flowSnippetVersionUuid: record.flowSnippetVersionUuid
                    });
                    navigate(`/workflow/detail?${query}`);
                  }
                },
                {
                  key: 'details',
                  label: (
                    <TriggerModal
                      title="Workflow details"
                      trigger={<span>View details</span>}
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
                  label: 'Duplicate',
                  icon: <WDuplicateIcon />,
                  onClick: () => onDuplicate(record)
                },
                {
                  danger: true,
                  key: 'delete',
                  label: 'Delete',
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