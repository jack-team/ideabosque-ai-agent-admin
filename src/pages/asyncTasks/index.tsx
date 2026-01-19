import { type FC  } from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import Table from '@/components/Table';
import PageContainer from '@/components/PageContainer';
import TriggerModal from '@/components/TriggerModal';
import { formatDate } from '@/utils';
import Details from './details';
import type { AsyncTaskDataType } from '@/typings/asyncTask';
import { asyncTaskListApi } from '@/services/asyncTasks';

const AsyncTasks: FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Async Tasks"
      onBack={() => navigate(-1)}
    >
      <Table<AsyncTaskDataType>
        pagination={{
          pageSize: 15
        }}
        search={false}
        options={false}
        scroll={{ x: 'max-content' }}
        rowKey="asyncTaskUuid"
        className="shopify"
        request={async (params) => {
         return asyncTaskListApi(params);
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
            title: 'Last updated',
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
                    title="Async Task Details"
                     trigger={<IconButton icon={ViewIcon} />}
                  >
                    <Details formData={record} />
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