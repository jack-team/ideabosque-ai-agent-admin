import { type FC, lazy } from 'react';
import { ProForm, ProFormDependency } from '@ant-design/pro-components';
import type { McpSettingDataType } from '@/typings/mcpConsole'

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

type ModuleFormProps = {
  formData?: McpSettingDataType;
};

const ModuleForm: FC<ModuleFormProps> = ({ formData }) => {
  const [form] = ProForm.useForm();
  return (
    <ProForm
      form={form}
      submitter={false}
      layout="vertical"
      initialValues={formData}
    >

      <ProFormDependency name={['setting']}>
        {({ setting }) => {
          const val = (() => {
            try {
              return JSON.stringify(setting, null, 2);
            } catch (err) {
              return '-'
            }
          })();
          return <SyntaxHighlighter>{val}</SyntaxHighlighter>;
        }}
      </ProFormDependency>
    </ProForm>
  );
};

export default ModuleForm;