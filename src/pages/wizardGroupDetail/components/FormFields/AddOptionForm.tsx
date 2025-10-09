import { type FC } from 'react';
import { Row, Col } from 'antd';
import { ProFormText, ProForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { EditFormProps } from './fields';

const AddOptionForm: FC<EditFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
    closeModal();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
      style={{ padding: '16px 0 0 0' }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="name"
            label="Label"
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="Value"
            label="value"
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