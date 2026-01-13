import { type FC } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { FormProps } from './types';
import styles from './styles.module.less';

const Form: FC<FormProps> = (props) => {
  const { onSubmit } = props;
  const [form] = ProForm.useForm();

  useModalOkClick(async () => {
    const values = await form?.validateFields();
    if (values) await onSubmit(values);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      className={styles.form}
      initialValues={props.formData}
    >
      {props.children?.(form)}
    </ProForm>
  );
}

export default Form;