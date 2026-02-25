import type { FC } from 'react';
import { Row, Col, Tag } from 'antd';
import { ProForm, ProFormText, ProFormDependency, ProCard } from '@ant-design/pro-components';
import { ViewIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import { useLang } from '@/hooks/useLang';
import TriggerModal from '@/components/TriggerModal';
import EditFrom from './components/EditForm';
import type { ThreadMessageDataType } from '@/typings/thread';
import styles from './styles.module.less';

type ThreadDetailContentProps = {
  data: Record<string, any>;
}

const ThreadDetailContent: FC<ThreadDetailContentProps> = (props) => {
  const { data } = props;
  const { t } = useLang();

  return (
    <ProForm
      initialValues={data}
      submitter={false}
      className={styles.container}
    >
      <ProCard title={t('thread.Thread details')}>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              label={t('agent.agentName')}
              name={["agent", "agentName"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label={t('agent.agentUuid')}
              name={["agent", "agentUuid"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="userId"
              label={t('thread.User name')}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="userId"
              label={t('thread.User UUID')}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              label={t('agent.agentDescription')}
              name={["agent", "agentDescription"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              disabled
              name="totalTokensUsed"
              label={t('thread.Total tokens used')}
            />
          </Col>
        </Row>
      </ProCard>
      <ProCard title={t('thread.Message Threads')}>
        <ProFormDependency name={['messages']}>
          {({ messages }) => {
            return (
              <Table<ThreadMessageDataType>
                search={false}
                fullScreen={false}
                rowKey="msgId"
                toolBarRender={false}
                dataSource={messages}
                scroll={{ x: 'auto' }}
                columns={[
                  {
                    key: 'message',
                    title: t('thread.Message'),
                    render: (_, record) => {
                      return record.message.content;
                    }
                  },
                  {
                    key: 'sender',
                    title: t('thread.Sender'),
                    render: (_, record) => {
                      return <Tag className={styles.tag}>
                        {record.message.role}
                      </Tag>;
                    }
                  },
                  {
                    width: 100,
                    key: 'actions',
                    title: t('common.actions'),
                    render: (_, record) => {
                      return (
                        <TriggerModal
                          width={620}
                          okText="Close"
                          showCancel={false}
                          title={t('thread.Message thread details')}
                          trigger={<IconButton icon={ViewIcon} />}
                        >
                          <EditFrom formData={record} />
                        </TriggerModal>
                      );
                    }
                  }
                ]}
              />
            )
          }}
        </ProFormDependency>
      </ProCard>
    </ProForm>
  );
}

export default ThreadDetailContent;