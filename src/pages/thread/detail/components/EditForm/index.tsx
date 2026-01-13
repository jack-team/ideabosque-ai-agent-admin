import { type FC } from 'react';
import { Divider, Row, Col } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;

  return (
    <ProForm
      disabled
      submitter={false}
      initialValues={formData}
      style={{
        padding: '0 0 24px 0'
      }}
    >
      <Divider orientation="vertical">
        Agent details
      </Divider>
      <Row gutter={24}>
        <Col span={24}>
          <ProFormText
            label="Sender"
            name={["message", "role"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Prompt tokens"
            name={["message", "run", "promptTokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Completion tokens"
            name={["message", "run", "completionTokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Total tokens"
            name={["message", "run", "totalTokens"]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;