import type { FC } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useListenModalOk } from '@/components/TriggerModal/hooks';
import styles from './styles.module.less';

const CreateForm: FC = () => {
  const [form] = ProForm.useForm();

  useListenModalOk(async () => {
    const formData = form.validateFields();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      className={styles.form}
    >
      <ProFormText
        label="Workflow name"
        name="name"
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default CreateForm;