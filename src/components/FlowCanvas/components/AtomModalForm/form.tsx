import type { FC } from 'react';
import { Form } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { AtomFormFormProps } from './types';
import styles from './styles.module.less';

const AtomForm: FC<AtomFormFormProps> = (props) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    closeModal();
  });

  return (
    //@ts-ignore
    <BetaSchemaForm
      form={form}
      submitter={false}
      columns={props.columns}
      initialValues={props.formData}
      className={styles.form}
    />
  );
}

export default AtomForm;