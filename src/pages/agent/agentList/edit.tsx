import { type FC } from 'react';
import { Col, Row, App, InputNumber } from 'antd';

import {
  ProForm,
  ProFormList,
  ProFormText,
  ProFormItem,
  ProFormSelect,
  ProFormTextArea,
  ProFormDependency
} from '@ant-design/pro-components';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { useModalOkClick } from '@/components/TriggerModal';
import SpinBox from '@/components/SpinBox';
import LLMSelect from '@/components/LLMSelect';
import type { LLMDataType } from '@/typings/llm';
import type { AgentDataType } from '@/typings/agent';
import WorkflowSelect from '@/components/WorkflowSelect';
import McpServerSelect from '@/components/McpServerSelect';
import { insertUpdateAgentApi } from '@/services/agent';
import Configuration from './components/Configuration';
import { agentRecordTransformFormData } from './helper';
import { useAgentDetail, useTemplateDetail } from '../hooks';
import { ToolCallMap } from './enum';

type EditFormProps = {
  agent?: AgentDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { agent } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [promptUuid, setPromptUuid] = useSafeState<string>();

  // 获取 Agent 信息，当编辑的时候
  const { loading } = useAgentDetail(agent, (res) => {
    form.setFieldsValue(agentRecordTransformFormData(res));
  });

  // 切换 Connected Workflows时获取对应的模板信息
  const {
    data: template,
    loading: requestLoading
  } = useTemplateDetail(promptUuid, (res) => {
    form.setFieldsValue({
      instructions: res.templateContext,
      mcpServerUuids: res.mcpServers.map(e => e.mcpServerUuid),
    });
  });

  const variables = template?.variables || [];

  const onLLMChange = useMemoizedFn((e: LLMDataType) => {
    form.setFieldsValue({
      llmName: e.llmName,
      configSchema: e.configurationSchema
    });
  });


  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateAgentApi({ ...values, updatedBy: 'Admin' });
      props.onSaveSuccess?.();
      message.success(`Saved successfully.`);
    } catch (err) {
      message.error(`Failed to save, please contact the administrator.`);
      return Promise.reject(err);
    }
  });

  return (
    <SpinBox loading={loading}>
      <ProForm
        form={form}
        submitter={false}
      >
        <ProFormText
          hidden
          name="agentUuid"
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
          fieldProps={{
            rows: 6
          }}
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
            <ProFormItem
              label="LLM Provider"
              name="llmProvider"
              rules={[
                { required: true }
              ]}
            >
              <LLMSelect onItemChange={onLLMChange} />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormText
              label="LLM Name"
              name="llmName"
              disabled
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormItem
              label="Connected Workflows"
              name="flowSnippetVersionUuid"
            >
              <WorkflowSelect onItemChange={e => setPromptUuid(e.promptUuid)} />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormItem
              label="Num of Messages"
              name="numOfMessages"
              rules={[
                { required: true }
              ]}
            >
              <InputNumber
                min={1}
                max={1000}
                step={1}
                style={{ width: '100%' }}
                placeholder="Please enter"
              />
            </ProFormItem>
          </Col>
        </Row>
        <ProFormDependency name={['configurationSchema']}>
          {({ configurationSchema: schema }) => {
            if (!schema) {
              return null;
            }
            return (
              <Col span={24}>
                <ProFormItem
                  label="Configuration"
                  name="configuration"
                  rules={[{ required: true }]}
                >
                  <Configuration schema={schema} />
                </ProFormItem>
              </Col>
            );
          }}
        </ProFormDependency>
        <ProFormDependency name={['flowSnippetVersionUuid', 'mcpServerUuids']}>
          {({ flowSnippetVersionUuid, mcpServerUuids = [] }) => {
            const disabled = !!flowSnippetVersionUuid;

            return (
              <SpinBox loading={requestLoading}>
                <ProFormTextArea
                  label="Instructions"
                  name="instructions"
                  disabled={disabled}
                  fieldProps={{ rows: 6 }}
                />
                <ProFormItem
                  label="MCP Servers"
                  name="mcpServerUuids"
                  hidden={disabled && !mcpServerUuids?.length}
                >
                  <McpServerSelect
                    mode="multiple"
                    disabled={disabled}
                  />
                </ProFormItem>
                {variables.length > 0 && (
                  <ProFormList
                    label="Variables"
                    name="variables"
                    alwaysShowItemLabel
                    className="custom-form-list"
                  >
                    <Row gutter={16}>
                      <ProFormText
                        hidden
                        name="dataType"
                        initialValue="string"
                      />
                      <Col span={12}>
                        <ProFormSelect
                          name="name"
                          label="Variable"
                          options={variables}
                          fieldProps={{
                            fieldNames: {
                              label: 'name',
                              value: 'name'
                            }
                          }}
                          rules={[
                            { required: true }
                          ]}
                        />
                      </Col>
                      <Col span={12}>
                        <ProFormText
                          name="value"
                          label="Value"
                          rules={[
                            { required: true }
                          ]}
                        />
                      </Col>
                    </Row>
                  </ProFormList>
                )}
              </SpinBox>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </SpinBox>
  );
}

export default EditForm;