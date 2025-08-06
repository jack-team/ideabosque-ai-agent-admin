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

  useListenModalOk(async () => {
    
  });

  return (
    <ProForm
      form={form}
      initialValues={recordToFormData(formData)}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        label="Coordination Name"
        name="coordinationName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Coordination Description"
        name="coordinationDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect 
        label="Agents"
        name="Agents"
      />
    </ProForm>
  );
}

export default EditFrom;