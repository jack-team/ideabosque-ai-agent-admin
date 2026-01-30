import { type FC, useMemo } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { InputNumber } from 'antd';
import { App } from 'antd';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpFunctionCallApi } from '@/services/mcpConsole';
import type { McpFunctionCallDataType } from '@/typings/mcpConsole';
import styles from './styles.module.less';

type FunctionCallFormProps = {
  onSuccess?: () => void;
  formData?: McpFunctionCallDataType;
};

const EditForm: FC<FunctionCallFormProps> = ({ onSuccess, formData }) => {
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  // 表单提交处理
  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      // 处理arguments字段，将字符串转换为JSON对象
      const processedValues = {
        ...values,
        arguments: values.arguments ? JSON.parse(values.arguments) : undefined,
        updatedBy: 'Admin',
      };

      await insertUpdateMcpFunctionCallApi(processedValues);
      message.success(`${formData ? 'Function call updated' : 'Function call added'} successfully.`);
      onSuccess?.();
      return true;
    } catch (error) {
      message.error(`${formData ? 'Failed to update function call' : 'Failed to add function call'}.`);
      console.error('Function call form error:', error);
      return false;
    }
  });

  const initFormData = useMemo(() => {
    if (!formData) return;
    const args = JSON.stringify(formData.arguments)
    return { ...formData, arguments: args };
  }, [formData]);

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="vertical"
      initialValues={initFormData}
      className={styles.edit_form}
    >
      <ProFormText
        name="mcpFunctionCallUuid"
        label="Function Call UUID"
        disabled
        hidden={!formData}
      />

      <ProFormText
        name="name"
        label="Function Name"
        rules={[
          { required: true, message: 'Please input function name' },
        ]}
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

      <ProFormSelect
        name="status"
        label="Status"
        options={[
          { label: 'Success', value: 'Success' },
          { label: 'Running', value: 'Running' },
          { label: 'Failed', value: 'Failed' },
        ]}
        rules={[
          { required: true, message: 'Please select status' },
        ]}
      />

      <ProFormTextArea
        name="arguments"
        label="Arguments (JSON)"
        placeholder="Enter arguments in JSON format"
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

      <ProFormSwitch
        name="hasContent"
        label="Has Content"
        placeholder="Does this function call have content?"
      />

      <ProForm.Item
        name="timeSpent"
        label="Time Spent (ms)"
        rules={[
          {
            type: 'number',
            min: 0,
            message: 'Time spent must be a positive number',
          },
        ]}
      >
        <InputNumber
          placeholder="Enter time spent in milliseconds"
          style={{ width: '100%' }}
        />
      </ProForm.Item>

      <ProFormTextArea
        name="notes"
        label="Notes"
        placeholder="Enter notes"
        fieldProps={{ rows: 3 }}
      />
    </ProForm>
  );
};

export default EditForm;