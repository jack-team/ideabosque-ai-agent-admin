import type { FC } from 'react';
import { ProForm } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';

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
      <ProForm.Item
        label="Business Name"
        name="businessName"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="address"
        name="address"
        pre
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Region"
        name="region"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Website"
        name="website"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Types"
        name="types"
      >
        <LongTextReadonly/>
      </ProForm.Item>
    </ProForm>
  );
}

export default EditFrom;