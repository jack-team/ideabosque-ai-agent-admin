import { type FC, useRef } from 'react';
import { Space, Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getMessageListApi } from '@/services/messages';

const Messages: FC = () => {
  const navigate = useNavigate();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  return (
    <PageContainer
      title="Messages"
      onBack={() => navigate(-1)}
    >
      <ProTable
        actionRef={ref}
        search={false}
        options={false}
        rowKey="questionGroupUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            messageList: result
          } = await getMessageListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.messageList
          }
        }}
        columns={[
          {
            title: 'Message UUID',
            dataIndex: 'messageUuid'
          },
          {
            title: 'Role',
            dataIndex: 'role'
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
                    width={640}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Message"
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