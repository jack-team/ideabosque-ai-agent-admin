import { type FC } from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getMessageListApi } from '@/services/messages';

const Messages: FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Messages"
      onBack={() => navigate(-1)}
    >
      <ProTable
        search={false}
        options={false}
        pagination={{
          defaultPageSize: 5
        }}
        scroll={{ x: 'max-content' }}
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
            width: '80px',
            key: 'action',
            title: 'Action',
            align: 'center',
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={710}
                    hasFooter={false}
                    destroyOnHidden
                    className="shopify"
                    title="Message Details"
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