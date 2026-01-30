import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { App } from 'antd';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpFunctionApi } from '@/services/mcpConsole';
import type { McpFunctionDataType } from '@/typings/mcpConsole';
import styles from './styles.module.less';

type FunctionFormProps = {
  onSuccess?: () => void;
  formData?: McpFunctionDataType;
};

const EditForm: FC<FunctionFormProps> = ({ onSuccess, formData }) => {
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  // 表单提交处理
  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      const params = {
        ...values,
        updatedBy: 'Admin',
      };

      await insertUpdateMcpFunctionApi(params);
      message.success(`${formData ? 'Function updated' : 'Function added'} successfully.`);
      onSuccess?.();
      return true;
    } catch (error) {
      message.error(`${formData ? 'Failed to update function' : 'Failed to add function'}.`);
      console.error('Function form error:', error);
      return false;
    }
  });

  return (
    <ProForm
      form={form}
      initialValues={formData}
      submitter={false}
      layout="vertical"
      className={styles.edit_form}
    >
      <ProFormText
        name="name"
        label="Function Name"
        rules={[
          { required: true, message: 'Please input function name' }
        ]}
        disabled={!!formData} // 编辑时禁用函数名称
      />

      <ProFormSelect
        name="mcpType"
        label="Type"
        options={[
          { label: 'Tool', value: 'tool' },
          { label: 'Resource', value: 'resource' },
        ]}
        rules={[
          { required: true, message: 'Please select function type' },
        ]}
      />

      <ProFormTextArea
        name="description"
        label="Description"
        placeholder="Enter function description"
        fieldProps={{ rows: 3 }}
      />

      <ProFormText
        name="moduleName"
        label="Module Name"
        placeholder="Enter module name"
      />

      <ProFormText
        name="className"
        label="Class Name"
        placeholder="Enter class name"
      />

      <ProFormText
        name="functionName"
        label="Function Name (Method)"
        placeholder="Enter method name"
      />

      <ProFormText
        name="returnType"
        label="Return Type"
        placeholder="Enter return type (e.g., String, JSON, Boolean)"
      />

      <ProFormSwitch
        name="isAsync"
        label="Is Async"
        placeholder="Is this function asynchronous?"
      />

      <ProFormTextArea
        name="annotations"
        label="Annotations"
        placeholder="Enter function annotations"
        fieldProps={{ rows: 3 }}
      />
    </ProForm>
  );
};

export default EditForm;