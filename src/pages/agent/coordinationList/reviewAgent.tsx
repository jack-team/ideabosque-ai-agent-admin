import { type FC, useRef } from 'react';
import { Divider } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useMount, useUnmount, useMemoizedFn } from 'ahooks';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import type { CoordinationDataType, AgentDataType } from '@/typings/agent';
import { partId } from '@/env';
import { renderTemplate } from './helper';
import integrationCode from './integration.txt?raw';
import styles from './styles.module.less';

type ReviewAgentProps = {
  record: CoordinationDataType;
}

const $body = document.body;
const sdkUrl = import.meta.env.ENV_AI_SDK_URL + '/sdk.iife.js?v=1.0';

const ReviewAgent: FC<ReviewAgentProps> = (props) => {
  const { coordinationUuid, agents = [] } = props.record;
  const [form] = ProForm.useForm();
  const ref = useRef<HTMLDivElement>(null);
  const agentSdkRef = useRef<AgentSdkInstance>(undefined);

  const getConfigs = useMemoizedFn((agent: AgentDataType) => {
    return {
      userId: partId,
      endpointId: partId,
      agent: agent.agentUuid,
      agentName: agent.agentName,
      coordination: coordinationUuid
    }
  });

  useMount(() => {
    agentSdkRef.current = AiChatSdk.createChat({
      openMode: 'window',
      target: ref.current!,
      clientId: 'xxxx',
      configs: getConfigs(agents[0])
    });
    agentSdkRef.current.init().then(res => {
      form.setFieldValue('url', res.data.chatUrl);
    });
  });

  useUnmount(() => {
    agentSdkRef.current?.destroy();
  });

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.content} />
      <ProForm
        form={form}
        submitter={false}
        className={styles.form}
        initialValues={{
          agent: agents[0]?.agentUuid
        }}
      >
        <ProFormSelect<AgentDataType>
          label="Agent"
          name="agent"
          options={agents}
          fieldProps={{
            allowClear: false,
            fieldNames: {
              label: 'agentName',
              value: 'agentUuid'
            },
            popupMatchSelectWidth: false,
            getPopupContainer: () => $body
          }}
          onChange={(_, option: AgentDataType) => {
            const sdk = agentSdkRef.current;
            sdk?.updateChatConfigs(getConfigs(option)).then(res => {
              form.setFieldValue('url', res.data.chatUrl);
            });
          }}
        />
        <Divider>Integration</Divider>
        <ProFormDependency name={['agent']}>
          {({ agent }) => {
            const curAgent = agents.find(e => e.agentUuid === agent);
            return curAgent ? (
              <div className={styles.integration}>
                <SyntaxHighlighter
                  style={dark}
                  language="javascript"
                >
                  {renderTemplate(integrationCode, {
                    ...getConfigs(curAgent),
                    sdkUrl
                  })}
                </SyntaxHighlighter>
              </div>
            ) : null;
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
}

export default ReviewAgent;