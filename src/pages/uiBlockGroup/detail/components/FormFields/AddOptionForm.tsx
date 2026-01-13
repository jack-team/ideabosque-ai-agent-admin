import { type FC } from 'react';
import { Row, Col } from 'antd';
import { ProFormText, ProForm } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { EditFormProps } from './fields';

const AddOptionForm: FC<EditFormProps> = (props) => {
  const [form] = ProForm.useForm();

  useModalOkClick(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
      style={{ padding: '16px 0 0 0' }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProFormText
            name="name"
            label="Name"
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={24}>
          <ProFormText
            name="value"
            label="Value"
            rules={[
              { required: true }
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default AddOptionForm;