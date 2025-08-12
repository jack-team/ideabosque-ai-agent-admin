import type { FC } from 'react';
import {
  ProForm
} from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';
import { Row, Col, Divider } from 'antd';
import { recordToFormData } from './helper';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      disabled
      form={form}
      submitter={false}
      labelAlign='left'
      initialValues={recordToFormData(formData)}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProForm.Item
            label="Email"
            name="email"
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            label="First Name"
            name="firstName"
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            label="Last Name"
            name="lastName"
          >
            <LongTextReadonly />
          </ProForm.Item>
        </Col>
        <Col span={24}>
          <Divider orientation="left">Data</Divider>
          <ProForm.Item name="data">
            <LongTextReadonly pre/>
          </ProForm.Item>
        </Col>
        <Col span={24}>
          <Divider orientation="left">Place</Divider>
          <ProForm.Item name="place">
            <LongTextReadonly pre/>
          </ProForm.Item>
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;