import type { FC } from 'react';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import { TriggerModal } from '@/components';
import { ProTable } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';
import styles from './styles.module.less';

type MessageListProps = {
  value?: any[];
}

const MessageList: FC<MessageListProps> = (props) => {
  const list = props.value || [];

  return (
    <div className={styles.messages}>
      <ProTable
        options={false}
        search={false}
        dataSource={list}
        pagination={{
          pageSize: 5
        }}
        className="shopify"
        columns={[
          {
            title: 'Role',
            key: 'role',
            render: (_, { message }) => {
              return message?.role || '-';
            }
          },
          {
            title: 'Prompt Tokens',
            key: 'prompt_tokens',
            render: (_, { message }) => {
              return message?.run?.prompt_tokens || '-';
            }
          },
          {
            title: 'Completion Tokens',
            key: 'completion_tokens',
            render: (_, { message }) => {
              return message?.run?.completion_tokens || '-';
            }
          },
          {
            title: 'Total Tokens',
            key: 'total_tokens',
            render: (_, { message }) => {
              return message?.run?.total_tokens || '-';
            }
          },
          {
            title: 'Actions',
            key: 'action',
            width: '80px',
            render: (_, { message }) => {
              return (
                <TriggerModal
                  width={620}
                  hasFooter={false}
                  title="Message Content"
                  trigger={<IconButton icon={ViewIcon} />}
                >
                  <div style={{ padding: '24px 0' }}>
                    <LongTextReadonly pre value={message?.content} />
                  </div>
                </TriggerModal>
              )
            }
          },
        ]}
      />
    </div>
  );
}

export default MessageList;