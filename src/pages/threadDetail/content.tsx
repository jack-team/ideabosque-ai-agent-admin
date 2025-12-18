import type { FC } from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { ProForm, ProFormText, ProTable, ProFormDependency } from '@ant-design/pro-components';
import { ViewIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { TriggerModal } from '@/components';
import EditFrom from './components/EditForm';
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
      <Card className="shopify" title="Thread details">
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              label="Agent name"
              name={["agent", "agent_name"]}
              fieldProps={{ readOnly: true }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="Agent UUID"
              name={["agent", "agent_uuid"]}
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
              name={["agent", "agent_description"]}
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
      </Card>
      <Card title="Message thread" className="shopify">
        <ProFormDependency name={['messages']}>
          {({ messages }) => {
            return (
              <ProTable
                search={false}
                toolBarRender={false}
                className="shopify"
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
                          title="Message thread details"
                          width={620}
                          okText="Close"
                          showCancel={false}
                          trigger={<IconButton icon={ViewIcon} />}
                        >
                          <EditFrom formData={record}/>
                        </TriggerModal>
                      )
                    }
                  }
                ]}
              />
            )
          }}
        </ProFormDependency>
      </Card>
    </ProForm>
  );
}

export default ThreadDetailContent;