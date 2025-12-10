import { type FC, useRef } from 'react';
import { Button, Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { TriggerModal } from '@/components';
import { EditIcon, DeleteIcon, EyeCheckMarkIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import ReviewAgent from './components/ReviewAgent';
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
        className: 'shopify gray'
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
          title="Add Coordination"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Add coordination
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
        pagination={{
          defaultPageSize: 4
        }}
        rowKey="coordinationUuid"
        scroll={{ x: 'max-content' }}
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
            width: 100,
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            render: (_, record) => {
              return (
                <Space>
                  {record.agents?.length > 0 && (
                    <TriggerModal
                      width={560}
                      hasFooter={false}
                      destroyOnHidden
                      className="shopify"
                      title="Review Agent"
                      trigger={<IconButton icon={EyeCheckMarkIcon} />}
                    >
                      <ReviewAgent record={record as any} />
                    </TriggerModal>
                  )}
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