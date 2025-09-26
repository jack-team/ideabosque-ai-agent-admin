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
      initialValues={formData}
      submitter={false}
      style={{
        padding: '24px 0 0 0',
        overflow: 'hidden'
      }}
    >
      <ProForm.Item
        label="Request Title"
        name="requestTitle"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label="Request Detail"
        name="requestDetail"
      >
        <LongTextReadonly pre rows={6}/>
      </ProForm.Item>
    </ProForm>
  );
}

export default EditFrom;