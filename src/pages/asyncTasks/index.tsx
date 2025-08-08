import { type FC, useRef } from 'react';
import { Space, Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getAsyncTaskListApi } from '@/services/asyncTasks';

const AsyncTasks: FC = () => {
  const navigate = useNavigate();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  return (
    <PageContainer
      title="Async Tasks"
      onBack={() => navigate(-1)}
    >
      <ProTable
        pagination={{
          pageSize: 10
        }}
        actionRef={ref}
        search={false}
        options={false}
        scroll={{ x: 'max-content' }}
        rowKey="asyncTaskUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            asyncTaskList: result
          } = await getAsyncTaskListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.asyncTaskList
          }
        }}
        columns={[
          {
            title: 'Async Task UUID',
            dataIndex: 'asyncTaskUuid'
          },
          {
            title: 'Function Name',
            dataIndex: 'functionName'
          },
          {
            title: 'Status',
            dataIndex: 'status'
          },
          {
            title: 'Time Spent',
            dataIndex: 'timeSpent'
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.createdAt)
          },
          {
            title: 'Update at',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.updatedAt)
          },
          {
            width: '120px',
            key: 'action',
            title: 'Action',
            align: 'center',
            hideInSearch: true,
            fixed: 'right',
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={640}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Async Task"
                    trigger={
                      <Button
                        size="small"
                        className="shopify"
                      >
                        View
                      </Button>
                    }
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                </Space>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default AsyncTasks;