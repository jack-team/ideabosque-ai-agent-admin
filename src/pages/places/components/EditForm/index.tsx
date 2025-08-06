import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
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
      disabled
      layout="horizontal"
      labelCol={{
        flex: '140px'
      }}
      labelAlign="left"
      initialValues={formData}
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
      <ProFormSelect
        label="Types"
        name="types"
        mode="tags"
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default EditFrom;