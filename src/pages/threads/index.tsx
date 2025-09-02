import { type FC } from 'react';
import { Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getThreadListApi } from '@/services/threads';

const Messages: FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Message Threads"
      extra={
        <Space>
          {/* <Button
            className="shopify gray"
            onClick={() => navigate('/messages')}
          >
            Messages
          </Button> */}
          <Button
            className="shopify gray"
            onClick={() => navigate('/async-tasks')}
          >
            Async Tasks
          </Button>
        </Space>
      }
    >
      <ProTable
        pagination={{
          pageSize: 5
        }}
        search={false}
        options={false}
        rowKey="threadUuid"
        className="shopify"
        scroll={{ x: 'max-content' }}
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            threadList: result
          } = await getThreadListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.threadList
          }
        }}
        columns={[
          {
            title: 'Thread UUID',
            dataIndex: 'threadUuid'
          },
          {
            title: 'Agent',
            key: 'agentUuid',
            render: (_, record) => {
              const agent = record.agent;
              if (!agent) return '-';
              return `${agent.agent_name}`;
            }
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
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={620}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Message thread Details"
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

export default Messages;