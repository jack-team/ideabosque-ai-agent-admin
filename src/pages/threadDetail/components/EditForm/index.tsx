import { type FC } from 'react';
import { Divider, Row, Col } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal/hooks';
import { ProForm, ProFormText } from '@ant-design/pro-components';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    closeModal();
  });

  return (
    <ProForm
      disabled
      submitter={false}
      initialValues={formData}
      style={{
        padding: '0 0 24px 0'
      }}
    >
      <Divider orientation="left" >
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
            name={["message", "run", "prompt_tokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Completion tokens"
            name={["message", "run", "completion_tokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Total tokens"
            name={["message", "run", "total_tokens"]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;