import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { EditIcon, DeleteIcon, EyeCheckMarkIcon } from '@shopify/polaris-icons';
import { PageContainer, type ActionType } from '@ant-design/pro-components';
import IconButton from '@/components/IconButton';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import type { CoordinationDataType } from '@/typings/agent';
import { formatDate } from '@/utils';
import Table from '@/components/Table';
import ReviewAgent from './reviewAgent';
import EditForm from './edit';
import { coordinationListApi, deleteCoordinationApi } from '@/services/agent';

const CoordinationList: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { coordinationName: val };
    actionRef.current?.reload();
  });

  const onDelete = useMemoizedFn((record: CoordinationDataType) => {
    modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Delete',
      onOk: async () => {
        try {
          await deleteCoordinationApi({
            coordinationUuid: record.coordinationUuid
          });
          onRefresh();
          message.success('Deletion successful.');
        } catch (err) {
          message.error('Deletion failed.');
          return Promise.reject(err);
        }
      }
    });
  });

  return (
    <PageContainer
      title="Coordinations"
      extra={
        <TriggerModal
          title="Add Coordination"
          trigger={
            <Button type="primary">
              Add coordination
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<CoordinationDataType>
        actionRef={actionRef}
        request={params => {
          return coordinationListApi({
            ...params,
            ...paramsRef.current
          });
        }}
        search={false}
        rowKey="coordinationUuid"
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: 'Coordination Name',
          },
        }}
        columns={[
          {
            title: 'Coordination UUID',
            dataIndex: 'coordinationUuid',
            hideInSearch: true
          },
          {
            title: 'Coordination Name',
            dataIndex: 'coordinationName'
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
              const { agents = [] } = record;
              return (
                <Space>
                  {agents.length > 0 && (
                    <TriggerModal
                      width="80vw"
                      hasFooter={false}
                      title="Review Agent"
                      trigger={<IconButton icon={EyeCheckMarkIcon} />}
                    >
                      <ReviewAgent record={record} />
                    </TriggerModal>
                  )}
                  <TriggerModal
                    title="Add Coordination"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditForm
                      coordination={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => onDelete(record)}
                  />
                </Space>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default CoordinationList;