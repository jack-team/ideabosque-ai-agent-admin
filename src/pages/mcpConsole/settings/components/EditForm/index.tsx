import { type FC } from 'react';
import {
  ProForm,
  ProFormItem
} from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { McpSettingDataType } from '@/typings/mcpConsole'
import LongTextReadonly from '@/components/LongTextReadonly';
import styles from './styles.module.less';

type ModuleFormProps = {
  formData?: McpSettingDataType;
};

const ModuleForm: FC<ModuleFormProps> = ({ formData }) => {
  const [form] = ProForm.useForm();

  // 表单提交处理
  useModalOkClick(async () => {
    return true;
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