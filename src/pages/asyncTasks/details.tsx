import { type FC } from 'react';
import { Divider } from 'antd';
import { ProForm, ProCard } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';

type DetailsProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const Details: FC<DetailsProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
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
      <Divider orientation="horizontal">Arguments</Divider>
      <ProCard style={{ marginBottom: 24 }}>
        <ProForm.Item
          label="Agent UUID"
          name={["arguments", "agentUuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="Run UUID"
          name={["arguments", "runUuid"]}
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
          name={["arguments", "threadUuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label="User Query"
          name={["arguments", "userQuery"]}
        >
          <LongTextReadonly pre />
        </ProForm.Item>
      </ProCard>
      <ProForm.Item name="notes" label="Notes">
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item name="result" label="Result">
        <LongTextReadonly />
      </ProForm.Item>
    </ProForm>
  );
}

export default Details;