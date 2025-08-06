import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      initialValues={formData}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        label="Request Title"
        name="requestTitle"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Request Detail"
        name="requestDetail"
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default EditFrom;