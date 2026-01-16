import { type FC, lazy } from 'react';
import { Divider, App, Space } from 'antd';
import copy from 'copy-to-clipboard';
import Button from '@/components/Button';
import { useMemoizedFn, useUpdateEffect } from 'ahooks';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ProForm, ProFormSelect, ProFormDependency, ProFormItem } from '@ant-design/pro-components';
import { useAiSdk } from '@/hooks/useAiSdk';
import SelectButton from '@/components/SelectButton';
import { modeOptions, positionOptions } from './configs';
import type { AgentDataType } from '@/typings/agent';
import { partId, sdkUrl } from '@/env';
import { renderTpl } from './helper';
import styles from './styles.module.less';
import codeTpl from './code_tpl.txt?raw';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

type ReviewAgentContentProps = {
  agents: AgentDataType[];
  coordinationUuid: string;
}

type FormDataType = {
  agent: string;
  openMode: OpenModeType;
  position: BubblePositionType;
}

const clientId = 'xxxxxx';
const $body = document.body;

const ReviewAgentContent: FC<ReviewAgentContentProps> = (props) => {
  const { agents, coordinationUuid } = props;
  const { message } = App.useApp();
  const [form] = ProForm.useForm<FormDataType>();

  const openMode = ProForm.useWatch('openMode', form) || 'window';
  const position = ProForm.useWatch('position', form) || 'bottomLeft';

  const [lasterAgent] = agents;

  const getConfigs = useMemoizedFn(
    (agent: AgentDataType) => ({
      userId: partId,
      endpointId: partId,
      agent: agent.agentUuid,
      agentName: agent.agentName,
      coordination: coordinationUuid
    })
  );

  const { sdk, target } = useAiSdk({
    clientId,
    openMode,
    ...getConfigs(lasterAgent)
  });

  useUpdateEffect(() => {
    if (openMode) {
      sdk?.setOpenMode(openMode);
    }
  }, [openMode]);

  useUpdateEffect(() => {
    if (position) {
      sdk?.setBubblePosition(position);
    }
  }, [position]);

  return (
    <div className={styles.container}>
      <div ref={target} className={styles.content} />
      <ProForm
        form={form}
        submitter={false}
        className={styles.form}
        initialValues={{
          agent: lasterAgent.agentUuid
        }}
      >
        <ProFormSelect<AgentDataType>
          label="Agent"
          name="agent"
          options={agents}
          fieldProps={{
            allowClear: false,
            popupMatchSelectWidth: false,
            getPopupContainer: () => $body,
            fieldNames: {
              label: 'agentName',
              value: 'agentUuid'
            }
          }}
          onChange={(_, o: AgentDataType) => {
            sdk?.updateChatConfigs(getConfigs(o));
          }}
        />
        <Divider>Integration</Divider>
        <div className={styles.integration}>
          <ProFormDependency name={['agent']}>
            {({ agent }) => {
              const curAgent = agents.find(e => {
                return e.agentUuid === agent;
              });

              if (!curAgent) {
                return null;
              }

              const code = renderTpl(codeTpl, {
                sdkUrl,
                clientId,
                position,
                openMode,
                ...getConfigs(curAgent),
              });

              return (
                <div className={styles.integration_content}>
                  <Space>
                    <ProFormItem
                      noStyle
                      name="openMode"
                    >
                      <SelectButton
                        options={modeOptions}
                        placeholder="Open Mode"
                      />
                    </ProFormItem>
                    {openMode === 'bubble' && (
                      <ProFormItem
                        noStyle
                        name="position"
                      >
                        <SelectButton
                          options={positionOptions}
                          placeholder="Bubble direction"
                        />
                      </ProFormItem>
                    )}
                    {!!sdk && (
                      <Button
                        size="small"
                        children="Copy chat url"
                        onClick={() => {
                          copy(sdk.resultData.data.chatUrl);
                          message.success('Successfully copied to clipboard.');
                        }}
                      />
                    )}
                    <Button
                      size="small"
                      children="Copy code"
                      onClick={() => {
                        copy(code);
                        message.success('Successfully copied to clipboard.');
                      }}
                    />
                  </Space>
                  <div className={styles.code_box}>
                    <SyntaxHighlighter style={dark} language="javascript">
                      {code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
        </div>
      </ProForm>
    </div>
  );
}

export default ReviewAgentContent;