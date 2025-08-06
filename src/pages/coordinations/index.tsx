import { type FC, useRef } from 'react';
import { Button, Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { TriggerModal } from '@/components';
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
          width={440}
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
        search={false}
        toolBarRender={false}
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
            title: 'Action',
            key: 'action',
            width: '150px',
            align: 'center',
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={440}
                    destroyOnHidden
                    className="shopify"
                    title="Edit Coordination"
                    trigger={
                      <Button
                        className="shopify"
                        size="small"
                        type="primary"
                      >
                        Edit
                      </Button>
                    }
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <Button
                    danger
                    size="small"
                    className="shopify"
                    onClick={() => handleDelete(record)}
                  >
                    Delete
                  </Button>
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