import { type FC, useRef } from 'react';
import { Space, Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getThreadListApi } from '@/services/threads';

const Messages: FC = () => {
  const navigate = useNavigate();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  return (
    <PageContainer
      title="Threads"
      extra={
        <Space>
          <Button
            className="shopify"
            onClick={() => navigate('/messages')}
          >
            Messages
          </Button>
          <Button
            className="shopify"
            onClick={() => navigate('/async-tasks')}
          >
            Async Tasks
          </Button>
        </Space>
      }
    >
      <ProTable
        pagination={{
          pageSize: 10
        }}
        actionRef={ref}
        search={false}
        options={false}
        rowKey="threadUuid"
        className="shopify"
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
            title: 'Agent UUID',
            key: 'agentUuid',
            render: (_, record) => {
              return record.agent?.agent_uuid;
            }
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
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={700}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Thread"
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

export default Messages;