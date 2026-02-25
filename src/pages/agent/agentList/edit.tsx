import { type FC, useRef } from 'react';
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
import { useLang } from '@/hooks/useLang';
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
import { objectIteration } from '@/utils';

type EditFormProps = {
  agent?: AgentDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { t } = useLang();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const isFirst = useRef(true);
  const [agent, setAgent] = useSafeState(props.agent);
  const [promptUuid, setPromptUuid] = useSafeState(agent?.flowSnippet?.promptUuid);

  const schema = agent?.llm?.configurationSchema;

  // 获取 Agent 信息，当编辑的时候
  const { loading } = useAgentDetail(agent, (res) => {
    setAgent(res);
    form.setFieldsValue(agentRecordTransformFormData(res));
  });

  // 切换 Connected Workflows时获取对应的模板信息
  const {
    data: template,
    loading: requestLoading
  } = useTemplateDetail(promptUuid, (res) => {
    const mcpServerUuids = res.mcpServers.map(e => e.mcpServerUuid);
    const instructions = isFirst.current ? agent?.instructions : res.templateContext;
    form.setFieldsValue({ mcpServerUuids, instructions });
    isFirst.current = false;
  }, loading);

  const variables = template?.variables || [];

  const onLLMChange = useMemoizedFn((e: LLMDataType) => {
    form.setFieldsValue({ llmName: e.llmName });
    form.resetFields(['configuration']);

    if (agent) {
      agent.llm = e;
      setAgent({ ...agent });
    }
  });

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateAgentApi({ ...values, updatedBy: 'Admin' });
      props.onSaveSuccess?.();
      message.success(t('common.Saved successfully'));
    } catch (err) {
      message.error(`common.Failed to save, please contact the administrator`);
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
          label={t('agent.agentName')}
          name="agentName"
          rules={[
            { required: true }
          ]}
        />
        <ProFormTextArea
          label={t('agent.agentDescription')}
          name="agentDescription"
          rules={[
            { required: true }
          ]}
          fieldProps={{
            rows: 6
          }}
        />
        <ProFormSelect
          label={t('agent.toolCallRole')}
          name="toolCallRole"
          valueEnum={objectIteration(ToolCallMap, t)}
          rules={[
            { required: true }
          ]}
        />
        <Row gutter={16}>
          <Col span={12}>
            <ProFormItem
              label={t('common.llmProvider')}
              name="llmProvider"
              rules={[
                { required: true }
              ]}
            >
              <LLMSelect
                autoFetch={false}
                onItemChange={onLLMChange}
              />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormText
              label={t('common.llmName')}
              name="llmName"
              disabled
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormItem
              label={t('agent.connectedWorkflows')}
              name="flowSnippetVersionUuid"
            >
              <WorkflowSelect
                autoFetch={false}
                onItemChange={e => setPromptUuid(e?.promptUuid)}
                options={agent?.flowSnippet ? [agent?.flowSnippet] : []}
              />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormItem
              label={t('agent.numOfMessages')}
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
          {!!schema && (
            <Col span={24}>
              <ProFormItem
                name="configuration"
                label={t('agent.configuration')}
                rules={[{ required: true }]}
              >
                <Configuration schema={schema} />
              </ProFormItem>
            </Col>
          )}
        </Row>
        <ProFormDependency name={['flowSnippetVersionUuid', 'mcpServerUuids']}>
          {({ flowSnippetVersionUuid, mcpServerUuids = [] }) => {
            const disabled = !!flowSnippetVersionUuid;
            const _loading = !loading && requestLoading;
            return (
              <SpinBox loading={_loading} alpha={.8}>
                <ProFormTextArea
                  label={t('agent.instructions')}
                  name="instructions"
                  disabled={disabled}
                  fieldProps={{ rows: 6 }}
                />
                <ProFormItem
                  label={t('common.mcpServers')}
                  name="mcpServerUuids"
                  hidden={disabled && !mcpServerUuids?.length}
                >
                  <McpServerSelect
                    mode="multiple"
                    autoFetch={false}
                    disabled={disabled}
                    options={agent?.mcpServers}
                  />
                </ProFormItem>
                {variables.length > 0 && (
                  <ProFormList
                    label={t('common.variables')}
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
                          label={t('common.variable')}
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
                          label={t('common.value')}
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