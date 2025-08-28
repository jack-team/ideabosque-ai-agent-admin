import { type FC  } from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getAsyncTaskListApi } from '@/services/asyncTasks';

const AsyncTasks: FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Async Tasks"
      onBack={() => navigate(-1)}
    >
      <ProTable
        pagination={{
          pageSize: 5
        }}
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
            width: '80px',
            key: 'action',
            title: 'Action',
            align: 'center',
            hideInSearch: true,
            fixed: 'right',
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={620}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Async Task Details"
                     trigger={<IconButton icon={ViewIcon} />}
                  >
                    <EditFrom formData={record} />
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