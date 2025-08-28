import { type FC } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { Divider, Row, Col } from 'antd';
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
      initialValues={formData}
      style={{
        padding: '24px 0'
      }}
    >
      <ProForm.Item
        label="Role"
        name="role"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item name="message" label="Message">
        <LongTextReadonly pre />
      </ProForm.Item>
      <Divider orientation="left">Run Details</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <ProForm.Item
            label="Prompt Tokens"
            name={["run", "prompt_tokens"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProForm.Item
            label="Completion Tokens"
            name={["run", "completion_tokens"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProForm.Item
            label="Total Tokens"
            name={["run", "total_tokens"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
      </Row>
      <Divider orientation="left">Thread Details</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <ProForm.Item
            label="Agent UUID"
            name={["run", "thread", "agent_uuid"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProForm.Item
            label="Thread UUID"
            name={["run", "thread", "thread_uuid"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProForm.Item
            label="User ID"
            name={["run", "thread", "user_id"]}
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;