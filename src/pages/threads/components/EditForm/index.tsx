import { type FC } from 'react';
import { Divider } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';
import MessageList from '../MessageList';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
      style={{
        padding: '0 0 24px 0'
      }}
    >
      <Divider orientation="left">
        Agent details
      </Divider>
      <ProForm.Item
        label="Agent UUID"
        name={["agent", "agent_uuid"]}
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Agent Name"
        name={["agent", "agent_name"]}
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Agent Description"
        name={["agent", "agent_description"]}
      >
        <LongTextReadonly />
      </ProForm.Item>
      <Divider orientation="left">Messages</Divider>
      <ProForm.Item name="messages">
        <MessageList />
      </ProForm.Item>
    </ProForm>
  );
}

export default EditFrom;