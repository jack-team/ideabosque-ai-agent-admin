import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-components';
import { App, Row, Col } from 'antd';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpModuleApi } from '@/services/mcpConsole';
import type { McpModuleDataType } from '@/typings/mcpConsole';
import { useLang } from '@/hooks/useLang';
import { partId } from '@/env';


type ModuleFormProps = {
  onSuccess?: () => void;
  formData?: McpModuleDataType;
  onSaveBefore?: () => Promise<void>;
};

const ModuleForm: FC<ModuleFormProps> = ({
  onSuccess,
  formData,
  onSaveBefore
}) => {
  const { message } = App.useApp();
  const { t } = useLang();
  const [form] = ProForm.useForm();

  // 表单提交处理
  useModalOkClick(async () => {
    await onSaveBefore?.();
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        updatedBy: partId(),
      };
      await insertUpdateMcpModuleApi(params);
      message.success(t('common.Saved successfully'));
      onSuccess?.();
      return true;
    } catch (error) {
      message.error(t('common.Failed to save, please contact the administrator'));
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
    >
      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="moduleName"
            label={t('mcpConsole.Module name')}
            rules={[
              { required: true, message: t('mcpConsole.Please input module name') },
              { pattern: /^[a-zA-Z_]+$/, message: t('mcpConsole.Module name can only contain letters and underscores') },
            ]}
            disabled={!!formData} // 编辑时禁用模块名称
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="packageName"
            label={t('mcpConsole.Package')}
            rules={[
              { required: true, message: t('mcpConsole.Please input package name') },
            ]}
          />
        </Col>
        <Col span={24}>
          <ProFormText
            name="source"
            label={t('mcpConsole.Source (Optional)')}
          />
        </Col>
      </Row>
      <ProFormList
        name="classes"
        label={t('mcpConsole.Classes')}
        className="custom-form-list"
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="settingId"
              label={t('mcpConsole.Setting id')}
              rules={[
                { required: true },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="className"
              label={t('mcpConsole.Class name')}
              rules={[
                { required: true },
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
};

export default ModuleForm;