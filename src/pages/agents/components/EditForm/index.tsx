import { type FC, useEffect } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency
} from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { App, Row, Col } from 'antd';
import {
  useLlms,
  useWorkflows,
  useMcpServers
} from '@/hooks/useFetchData';
import Configuration from '../Configuration';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData, formDataToParams } from './helper';
import { insertUpdateAgentApi } from '@/services/agent';
import { ToolCallMap } from '@/constants/map';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const llm = useLlms();
  const workflows = useWorkflows();
  const mcpServers = useMcpServers();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  const initFromData = useMemoizedFn(() => {
    form.setFieldsValue(recordToFormData(formData));
  });

  useEffect(() => {
    if (formData) {
      initFromData();
    }
  }, [formData]);

  useListenModalOk(async () => {
    const values = await form.validateFields();
    const params = formDataToParams(values);

    try {
      await insertUpdateAgentApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`Agent ${formData ? 'updated' : 'created'} successfully.`);
    } catch (err) {
      message.error(`Failed to ${formData ? 'updated' : 'created'} Agent.`);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="agentUuid"
      />
      <ProFormText
        hidden
        name="configurationSchema"
      />
      <ProFormText
        label="Agent Name"
        name="agentName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Agent Description"
        name="agentDescription"
        rules={[
          { required: true }
        ]}
      />
      <Row gutter={16}>
        <Col span={12}>
          <ProFormSelect
            label="LLM Provider"
            name="llmProvider"
            options={llm.options}
            fieldProps={{
              loading: llm.loading,
              onChange: (_, option) => {
                if (!Array.isArray(option)) {
                  form.setFieldsValue({
                    llmName: option?.realData.llmName
                  });
                }
              }
            }}
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="llmName"
            label="LLM Name"
            disabled
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Flow snippet"
            name="flowSnippet"
            options={workflows.options}
            fieldProps={{
              loading: workflows.loading
            }}
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Num of Messages"
            name="numOfMessages"
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Tool Call Role"
            name="toolCallRole"
            valueEnum={ToolCallMap}
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="MCP Servers"
            name="mcpServerUuids"
            mode="multiple"
            options={mcpServers.options}
            fieldProps={{
              maxTagCount: 1,
              loading: mcpServers.loading
            }}
            rules={[
              { required: true }
            ]}
          />
        </Col>
      </Row>
      <ProFormDependency name={['configurationSchema']}>
        {({ configurationSchema: schema }) => {
          if (!schema) return null;
          return (
            <ProForm.Item
              name="configuration"
              label="Configuration"
              rules={[{ required: true }]}
            >
              <Configuration schema={schema} />
            </ProForm.Item>
          );
        }}
      </ProFormDependency>
      <ProFormTextArea
        label="Instructions"
        name="instructions"
      />
    </ProForm>
  );
}

export default EditFrom;