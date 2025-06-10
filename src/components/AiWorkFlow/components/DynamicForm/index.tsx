import type { FC } from 'react';
import { useMemo } from 'react';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { DynamicFormProps } from './types';
import { getFormColumn } from './helper';
import styles from './styles.module.less';

const DynamicForm: FC<DynamicFormProps> = (props) => {
  const { schemas = [] } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  const columns = useMemo(() => {
    return schemas.map(getFormColumn);
  },[schemas]);

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    await props.onSubmit?.(formData);
    closeModal();
  });

  return (
    <div className={styles.dynamic_form}>
      <BetaSchemaForm
        form={form}
        submitter={false}
        columns={columns}
      />
    </div>
  );
}

export default DynamicForm;