import { type FC } from 'react';
import { Divider, Card } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const cardLabelCol = {
  flex: '104px'
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="horizontal"
      labelAlign="left"
      labelCol={{
        flex: '120px'
      }}
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
      <Card className="shopify">
        <ProForm.Item
          label="Agent UUID"
          name={["arguments", "agent_uuid"]}
          labelCol={cardLabelCol}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Run UUID"
          name={["arguments", "run_uuid"]}
          labelCol={cardLabelCol}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Stream"
          name={["arguments", "stream"]}
          labelCol={cardLabelCol}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Thread UUID"
          name={["arguments", "thread_uuid"]}
          labelCol={cardLabelCol}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="User Query"
          name={["arguments", "user_query"]}
          labelCol={cardLabelCol}
        >
          <LongTextReadonly pre />
        </ProForm.Item>
      </Card>
      <Divider orientation="left">Notes</Divider>
      <ProForm.Item name="notes">
        <LongTextReadonly />
      </ProForm.Item>
      <Divider orientation="left">Result</Divider>
      <ProForm.Item name="result">
        <LongTextReadonly />
      </ProForm.Item>
    </ProForm>
  );
}

export default EditFrom;