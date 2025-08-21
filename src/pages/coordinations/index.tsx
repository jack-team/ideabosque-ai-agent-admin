import { type FC, useRef } from 'react';
import { Button, Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { TriggerModal } from '@/components';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { getCoordinationsApi, deleteCoordinationApi } from '@/services/contactProfiles';

const Coordinations: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const handleDelete = useMemoizedFn((record: Record<string, any>) => {
    modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Delete',
      okButtonProps: {
        danger: true,
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify'
      },
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
    })
  });

  return (
    <PageContainer
      className="shopify"
      title="Coordinations"
      extra={
        <TriggerModal
          width={620}
          destroyOnHidden
          className="shopify"
          title="Create Coordination"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Create coordination
            </Button>
          }
        >
          <EditFrom onSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <ProTable
        actionRef={actionRef}
        className="shopify"
        options={false}
        size="small"
        search={false}
        rowKey="coordinationUuid"
        columns={[
          {
            title: 'Coordination UUID',
            dataIndex: 'coordinationUuid'
          },
          {
            title: 'Coordination Name',
            dataIndex: 'coordinationName'
          },
          {
            title: 'Create at',
            dataIndex: 'createAt',
            render: (_, e) => formatDate(e.createAt)
          },
          {
            title: 'Update at',
            dataIndex: 'updateAt',
            render: (_, e) => formatDate(e.updateAt)
          },
          {
            width: 120,
            title: 'Actions',
            key: 'action',
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={620}
                    destroyOnHidden
                    className="shopify"
                    title="Edit Coordination"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleDelete(record)}
                  />
                </Space>
              )
            }
          }
        ]}
        request={async (params) => {
          const {
            coordinationList: result
          } = await getCoordinationsApi({
            limit: params.pageSize,
            pageNumber: params.current
          });
          return {
            total: result.total,
            data: result.coordinationList
          };
        }}
      />
    </PageContainer>
  );
}

export default Coordinations;