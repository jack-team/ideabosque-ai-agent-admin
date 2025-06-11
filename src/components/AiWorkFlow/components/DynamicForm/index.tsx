import type { FC } from 'react';
import { useMemo } from 'react';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { DynamicFormProps } from './types';
import { getFormColumn, getValueEnum, getFormItems } from './helper';
import styles from './styles.module.less';

const DynamicForm: FC<DynamicFormProps> = (props) => {
  const { schemas = [] } = props;
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
    const formData = await form.validateFields();
    Object.keys(formData).map(key => {
      const value = formData[key];

      const result = formItems.find(item => {
        return item.name === key;
      });

      if (result?.type === 'select') {
        formData[key] = {
          _type_: 'select',
          value: formData[key],
          label: valueEnum[value]
        }
      }
    });
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