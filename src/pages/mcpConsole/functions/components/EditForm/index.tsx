import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { App } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { insertUpdateMcpFunctionApi } from '@/services/mcpConsole';
import type { FunctionItem } from '../../index';
import styles from './styles.module.less';

type FunctionFormProps = {
  onSuccess?: () => void;
  formData?: FunctionItem;
};

const EditForm: FC<FunctionFormProps> = ({ onSuccess, formData }) => {
  const { message } = App.useApp();
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  // 表单提交处理
  useListenModalOk(async () => {
    try {
      const values = await form.validateFields();

      const params = {
        ...values,
        updatedBy: 'Admin',
      };

      await insertUpdateMcpFunctionApi(params);
      message.success(`${formData ? 'Function updated' : 'Function added'} successfully.`);
      closeModal();
      onSuccess?.();
    } catch (error) {
      message.error(`${formData ? 'Failed to update function' : 'Failed to add function'}.`);
      console.error('Function form error:', error);
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
          { required: true, message: 'Please input function name' },
          { pattern: /^[a-zA-Z_]+$/, message: 'Function name can only contain letters and underscores' },
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

      <ProFormTextArea
        name="data"
        label="Data (JSON)"
        placeholder="Enter JSON data"
        fieldProps={{ 
          rows: 5,
          style: { fontFamily: 'monospace' },
        }}
        rules={[
          {
            validator: (_: any, value: string) => {
              if (!value) return Promise.resolve();
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject(new Error('Invalid JSON format'));
              }
            },
          },
        ]}
      />
    </ProForm>
  );
};

export default EditForm;