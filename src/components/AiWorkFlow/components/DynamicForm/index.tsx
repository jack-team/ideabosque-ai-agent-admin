import type { FC } from 'react';
import { useMemo } from 'react';
import type { DynamicFormProps } from './types';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import {
  getFormColumn,
  getValueEnum,
  getFormItems,
  transformOutputFormData
} from './helper';

import styles from './styles.module.less';

const DynamicForm: FC<DynamicFormProps> = (props) => {
  const { schemas = [], formData } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  const columns = useMemo(() => {
    return schemas.map(getFormColumn);
  }, [schemas]);

  const valueEnum = useMemo(() => {
    return getValueEnum(schemas);
  }, [schemas]);

  const formItems = useMemo(() => {
    return getFormItems(schemas);
  }, [schemas]);

  useListenModalOk(async () => {
    let formData = await form.validateFields();
    formData = transformOutputFormData(
      formData, 
      formItems, 
      valueEnum
    );
    await props.onSubmit?.({ formData });
    closeModal();
  });

  return (
    <div className={styles.dynamic_form}>
      <BetaSchemaForm
        form={form}
        submitter={false}
        columns={columns}
        initialValues={formData}
      />
    </div>
  );
}

export default DynamicForm;