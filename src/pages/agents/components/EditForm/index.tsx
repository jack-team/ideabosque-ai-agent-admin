import { type FC, useMemo, useRef } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency
} from '@ant-design/pro-components';
import { App, Row, Col } from 'antd';
import { useRequest, useUpdateEffect } from 'ahooks';
import {
  useLlms,
  useWorkflows,
  useMcpServers
} from '@/hooks/useFetchData';
import SpinBox from '@/components/SpinBox';
import { getAgentDetailApi } from '@/services/agent';
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
  const initFromDataRef = useRef<Record<string, any>>(undefined);

  const { loading, data } = useRequest(async () => {
    if (!formData) {
      return Promise.resolve(null);
    }
    const result = await getAgentDetailApi({
      agentUuid: formData.agentUuid,
      agentVersionUuid: formData.agentVersionUuid
    });
    return result.agent;
  });


  useUpdateEffect(() => {
    if (!loading && data) {
      initFromDataRef.current = recordToFormData(data);
      form.setFieldsValue(initFromDataRef.current);
    }
  }, [loading, data]);

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
    <SpinBox loading={loading}>
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
        <ProFormSelect
          label="Tool Call Role"
          name="toolCallRole"
          valueEnum={ToolCallMap}
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
                    const r = option?.realData;
                    form.setFieldsValue({
                      llmName: r?.llmName,
                      configurationSchema: r.configurationSchema
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
              label="Connected Workflows"
              name="flowSnippet"
              options={workflows.options}
              fieldProps={{
                loading: workflows.loading,
                onChange: (_, option: any) => {
                  const initFromData = initFromDataRef.current;
                  if (option) {
                    const realData = option.realData;
                    const tpl = realData.promptTemplate;
                    const mcpServers = tpl.mcp_servers as any[];
                    const uuid = mcpServers?.map(e => e.mcp_server_uuid);
                    form.setFieldValue('mcpServerUuids', uuid);
                  } else {
                    form.setFieldValue('mcpServerUuids', initFromData?.mcpServerUuids);
                  }
                }
              }}
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
        </Row>
        <ProFormDependency name={["flowSnippet"]}>
          {({ flowSnippet }) => {
            return (
              <ProFormTextArea
                disabled={!!flowSnippet}
                label="Instructions"
                name="instructions"
                fieldProps={{ rows: 10 }}
              />
            )
          }}
        </ProFormDependency>
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
        <ProFormDependency name={["flowSnippet"]}>
          {({ flowSnippet }) => {
            return (
              <ProFormSelect
                disabled={!!flowSnippet}
                label="MCP Servers"
                name="mcpServerUuids"
                mode="multiple"
                options={mcpServers.options}
                fieldProps={{
                  maxTagCount: 1,
                  loading: mcpServers.loading
                }}
                rules={[
                  { required: false }
                ]}
              />
            )
          }}
        </ProFormDependency>
      </ProForm>
    </SpinBox>

  );
}

export default EditFrom;