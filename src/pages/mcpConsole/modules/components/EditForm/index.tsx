import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormList,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { App, Row, Col } from 'antd';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpModuleApi } from '@/services/mcpConsole';
import type { McpModuleDataType } from '@/typings/mcpConsole';
import styles from './styles.module.less';

type ModuleFormProps = {
  onSuccess?: () => void;
  formData?: McpModuleDataType;
};

const ModuleForm: FC<ModuleFormProps> = ({ onSuccess, formData }) => {
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  // 表单提交处理
  useModalOkClick(async () => {
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        updatedBy: 'Admin',
      };
      await insertUpdateMcpModuleApi(params);
      message.success(`${formData ? 'Module updated' : 'Module added'} successfully.`);
      onSuccess?.();
      return true;
    } catch (error) {
      message.error(`${formData ? 'Failed to update module' : 'Failed to add module'}.`);
      console.error('Module form error:', error);
      return false;
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="vertical"
      initialValues={formData}
      className={styles.edit_form}
    >
      <ProFormText
        name="moduleName"
        label="Module Name"
        rules={[
          { required: true, message: 'Please input module name' },
          { pattern: /^[a-zA-Z_]+$/, message: 'Module name can only contain letters and underscores' },
        ]}
        disabled={!!formData} // 编辑时禁用模块名称
      />

      <ProFormText
        name="packageName"
        label="Package"
        rules={[
          { required: true, message: 'Please input package name' },
        ]}
      />
      <ProFormList
        name="classes"
        label="Classes"
        className="custom-form-list"
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="settingId"
              label="Setting id"
              rules={[
                { required: true },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="className"
              label="Class name"
              rules={[
                { required: true },
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
      <ProFormTextArea
        name="source"
        label="Source (Optional)"
        placeholder="Enter module source code or description"
        fieldProps={{ rows: 4 }}
      />
    </ProForm>
  );
};

export default ModuleForm;