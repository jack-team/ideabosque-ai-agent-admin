import { Row, Col, App, Divider } from 'antd';
import { type FC, type Key, Fragment } from 'react';
import { ProForm, ProFormSwitch, ProFormText, ProCard } from '@ant-design/pro-components';
import type { McpSettingDataType } from '@/typings/mcpConsole';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpSettingApi } from '@/services/mcpConsole';
import { partId } from '@/env';
import styles from './styles.module.less';

type ModuleFormProps = {
  formData: McpSettingDataType;
  onSaved: () => void;
}

const ModuleForm: FC<ModuleFormProps> = ({ formData, onSaved }) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const setting = formData?.setting || {};


  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateMcpSettingApi({
        setting: values,
        updatedBy: partId,
        settingId: formData.settingId
      });
      onSaved();
      message.success(`Saved successfully.`);
    } catch (err) {
      message.error(`Failed to save, please contact the administrator.`);
      return Promise.reject(err);
    }
  });

  const renderItem = (names: Key[], key: Key, val: any) => {
    const namePath = [...names, key];

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        return (
          <div className={styles.card}>
            <ProCard title={key}>
              <Row gutter={16}>
                {val.map((val, i) => {
                  return (
                    <Fragment key={i}>
                      {renderItem(namePath, i, val)}
                    </Fragment>
                  );
                })}
              </Row>
            </ProCard>
          </div>
        );
      } else {
        const keys = Object.keys(val!);
        return (
          <div className={styles.card}>
            <ProCard title={key}>
              <Row gutter={16}>
                {keys.map(k => {
                  return (
                    <Fragment key={k}>
                      {renderItem(namePath, k, val[k])}
                    </Fragment>
                  );
                })}
              </Row>
            </ProCard>
          </div>

        );
      }
    }

    if (typeof val === 'boolean') {
      return (
        <Col span={24}>
          <ProFormSwitch
            label={key}
            name={namePath}
            rules={[{ required: true }]}
          />
        </Col>
      );
    }

    return (
      <Col span={24}>
        <ProFormText
          label={key}
          name={namePath}
          rules={[{ required: true }]}
        />
      </Col>
    );
  }

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="vertical"
      initialValues={formData?.setting}
    >
      <Row gutter={16}>
        {Object.keys(setting).map(key => {
          return (
            <Fragment key={key}>
              {renderItem([], key, setting[key])}
            </Fragment>
          );
        })}
      </Row>
    </ProForm>
  );
};

export default ModuleForm;