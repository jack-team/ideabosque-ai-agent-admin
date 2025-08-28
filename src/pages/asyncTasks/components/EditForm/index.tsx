import { type FC } from 'react';
import { Divider, Card } from 'antd';
import { ProForm } from '@ant-design/pro-components';
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
      submitter={false}
      initialValues={formData}
      style={{
        padding: '24px 0'
      }}
    >
      <ProForm.Item
        label="Function Name"
        name="functionName"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Status"
        name="status"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Time Spent"
        name="timeSpent"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <Divider orientation="left">Arguments</Divider>
      <Card className="shopify" style={{ marginBottom: 24 }}>
        <ProForm.Item
          label="Agent UUID"
          name={["arguments", "agent_uuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Run UUID"
          name={["arguments", "run_uuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Stream"
          name={["arguments", "stream"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Thread UUID"
          name={["arguments", "thread_uuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="User Query"
          name={["arguments", "user_query"]}
        >
          <LongTextReadonly pre />
        </ProForm.Item>
      </Card>
      <ProForm.Item name="notes" label="Notes">
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item name="result" label="Result">
        <LongTextReadonly />
      </ProForm.Item>
    </ProForm>
  );
}

export default EditFrom;