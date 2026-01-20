import type { FC } from 'react';
import { Row, Col, Tag } from 'antd';
import { ProForm, ProFormText, ProFormDependency, ProCard } from '@ant-design/pro-components';
import { ViewIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import TriggerModal from '@/components/TriggerModal';
import EditFrom from './components/EditForm';
import type { ThreadMessageDataType } from '@/typings/thread';
import styles from './styles.module.less';

type ThreadDetailContentProps = {
  data: Record<string, any>;
}

const ThreadDetailContent: FC<ThreadDetailContentProps> = (props) => {
  const { data } = props;
  return (
    <ProForm
      initialValues={data}
      submitter={false}
      className={styles.container}
    >
      <ProCard title="Thread details">
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              label="Agent name"
              name={["agent", "agentName"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="Agent UUID"
              name={["agent", "agentUuid"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="userId"
              label="User name"
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="userId"
              label="User UUID"
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              label="Agent Description"
              name={["agent", "agentDescription"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              disabled
              name="totalTokensUsed"
              label="Total tokens used"
            />
          </Col>
        </Row>
      </ProCard>
      <ProCard title="Message thread">
        <ProFormDependency name={['messages']}>
          {({ messages }) => {
            return (
              <Table<ThreadMessageDataType>
                search={false}
                rowKey={(_, i) => `key_${i}`}
                toolBarRender={false}
                dataSource={messages}
                columns={[
                  {
                    key: 'message',
                    title: 'Message',
                    render: (_, record) => {
                      return record.message.content;
                    }
                  },
                  {
                    key: 'sender',
                    title: 'Sender',
                    render: (_, record) => {
                      return <Tag className={styles.tag}>{record.message.role}</Tag>;
                    }
                  },
                  {
                    width: 100,
                    key: 'actions',
                    title: 'Actions',
                    render: (_, record) => {
                      return (
                        <TriggerModal
                          width={620}
                          okText="Close"
                          showCancel={false}
                          title="Message thread details"
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