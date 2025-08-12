import { type FC } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { Divider, Card } from 'antd';
import LongTextReadonly from '@/components/LongTextReadonly';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      disabled
      submitter={false}
      layout="horizontal"
      labelAlign="left"
      initialValues={formData}
      style={{
        padding: '24px 0'
      }}
    >
      <ProForm.Item
        label="Role"
        name="role"
        labelCol={{ flex: '166px' }}
      >
        <LongTextReadonly />
      </ProForm.Item>
      <Divider orientation="left">Message</Divider>
      <ProForm.Item name="message">
        <LongTextReadonly pre />
      </ProForm.Item>
      <Divider orientation="left">Run</Divider>
      <Card className="shopify">
        <ProForm.Item
          label="Prompt Tokens"
          name={["run", "prompt_tokens"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Completion Tokens"
          name={["run", "completion_tokens"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Total Tokens"
          name={["run", "total_tokens"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <Divider orientation="left">Thread</Divider>
        <ProForm.Item
          label="Agent UUID"
          name={["run", "thread", "agent_uuid"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Thread UUID"
          name={["run", "thread", "thread_uuid"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="User ID"
          name={["run", "thread", "user_id"]}
          labelCol={{ flex: '150px' }}
        >
          <LongTextReadonly />
        </ProForm.Item>
      </Card>
    </ProForm>
  );
}

export default EditFrom;