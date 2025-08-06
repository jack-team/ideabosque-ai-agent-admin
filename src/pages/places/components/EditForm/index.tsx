import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect
} from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData } from './helper';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  console.log(formData)

  useListenModalOk(async () => {

  });

  return (
    <ProForm
      form={form}
      disabled
      layout="horizontal"
      labelCol={{
        flex: '140px'
      }}
      labelAlign="left"
      initialValues={recordToFormData(formData)}
      submitter={false}
      style={{
        padding: '24px 0 24px 0'
      }}
    >
      <ProFormText
        label="Business Name"
        name="businessName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="address"
        name="address"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Region"
        name="region"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Website"
        name="website"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Types"
        name="types"
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default EditFrom;