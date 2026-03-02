
import { Space, App } from 'antd';
import { type FC, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from '@/hooks/useNavigate';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { type ActionType } from "@ant-design/pro-components";
import PageContainer from '@/components/PageContainer';
import { wizardGroupListApi, deleteWizardGroupApi } from "@/services/wizardGroup";
import type { WizardGroupResultType } from '@/typings/wizardGroup';
import { StatusEnum } from '@/constants/enum';
import { useLang } from '@/hooks/useLang';
import { formatDate } from '@/utils';
import CreateForm from './createForm';

const WorkflowTemplates: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload(true);
  });

  const toDetail = useMemoizedFn((record: WizardGroupResultType) => {
    navigate(`/ui-block-group/${record.wizardGroupUuid}`);
  });

  const handleArchive = useMemoizedFn((record: WizardGroupResultType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await deleteWizardGroupApi({
            wizardGroupUuid: record.wizardGroupUuid
          });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error(t('common.Failed to delete'));
          return Promise.reject(err);
        }
      }
    });
  });

  return (
    <PageContainer
      fullScreen
      title={t('uiBlockGroup.uiBlockGroups')}
      extra={
        <TriggerModal
          title={t('uiBlockGroup.Create new UI Block Group')}
          trigger={
            <Button type="primary">
              {t('uiBlockGroup.Create new UI Block Group')}
            </Button>
          }
        >
          <CreateForm onSuccess={toDetail} />
        </TriggerModal>
      }
    >
      <Table<WizardGroupResultType>
        rowKey="wizardGroupUuid"
        cacheKey="uiBlockGroups"
        actionRef={actionRef}
        options={false}
        search={false}
        pagination={{
          defaultPageSize: 15
        }}
        columns={[
          {
            width: '25%',
            dataIndex: "wizardGroupName",
            title: t('uiBlockGroup.UI Block Group name'),
          },
          {
            dataIndex: "wizardGroupUuid",
            title: t('uiBlockGroup.UI Block Group UUID'),
            hideInSearch: true,
          },
          {
            dataIndex: "createdAt",
            title: t('common.createdAt'),
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            dataIndex: "updatedAt",
            title: t('common.updatedAt'),
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: t('common.actions'),
            width: "100px",
            align: "center",
            hideInSearch: true,
            fixed: "right",
            render: (_, record) => {
              return (
                <Space>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => toDetail(record)}
                  />
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleArchive(record)}
                  />
                </Space>
              );
            },
          },
        ]}
        request={async (params) => {
          return wizardGroupListApi({
            ...params,
            statuses: [StatusEnum.Active],
          })
        }}
      />
    </PageContainer>
  );
};

export default WorkflowTemplates;
