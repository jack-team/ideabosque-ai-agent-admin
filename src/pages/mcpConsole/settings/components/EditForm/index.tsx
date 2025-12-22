import { type FC } from 'react';
import {
  ProForm,
  ProFormItem
} from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { ModuleItem } from '../../index';
import LongTextReadonly from '@/components/LongTextReadonly';
import styles from './styles.module.less';

type ModuleFormProps = {
  formData?: ModuleItem;
};

const ModuleForm: FC<ModuleFormProps> = ({ formData }) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  // 表单提交处理
  useListenModalOk(async () => {
      closeModal();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="vertical"
      initialValues={formData}
      className={styles.edit_form}
    >

      <ProFormItem name={['setting']}>
        <LongTextReadonly pre/>
      </ProFormItem>
    </ProForm>
  );
};

export default ModuleForm;