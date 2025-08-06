import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect
} from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {

  });

  return (
    <ProForm
      disabled
      form={form}
      submitter={false}
      initialValues={formData}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProFormText
            label="Email"
            name="email"
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="First Name"
            name="firstName"
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Last Name"
            name="lastName"
            rules={[
              { required: true }
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;