import { type FC, useRef } from 'react';
import { Divider, App, Dropdown, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Button from '@/components/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useMount, useUnmount, useMemoizedFn, useSafeState, useUpdateEffect } from 'ahooks';
import copy from 'copy-to-clipboard';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import type { CoordinationDataType, AgentDataType } from '@/typings/agent';
import { partId } from '@/env';
import { renderTemplate } from './helper';
import tplWin from './tpl_window.txt?raw';
import tplBubble from './tpl_bubble.txt?raw';
import styles from './styles.module.less';

type ReviewAgentProps = {
  record: CoordinationDataType;
}

const $body = document.body;
const sdkUrl = import.meta.env.ENV_AI_SDK_URL + '/sdk.iife.js?v=1.0';

const modeOptions = [
  {
    key: 'bubble',
    label: 'Bubble',
  },
  {
    key: 'window',
    label: 'Window'
  }
];

const bubbleDirectionOptions = [
  {
    key: 'topLeft',
    label: 'Left top',
  },
  {
    key: 'bottomLeft',
    label: 'Left bottom'
  },
  {
    key: 'topRight',
    label: 'Right top'
  },
  {
    key: 'bottomRight',
    label: 'Right bottom'
  }
];

const ReviewAgent: FC<ReviewAgentProps> = ({ record }) => {
  const { coordinationUuid, agents = [] } = record;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [openMode, setOpenMode] = useSafeState('window');
  const [bubbleDirection, setBubbleDirection] = useSafeState('bottomRight');

  const isWinMode = openMode === 'window';
  const codeTpl = isWinMode ? tplWin : tplBubble;

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

  useUpdateEffect(() => {
    agentSdkRef.current?.setOpenMode(openMode);
  }, [openMode]);

  const renderSelectBtn = (params: {
    title: string;
    items: any[];
    onClick: (key: string) => void;
  }) => (
    <Dropdown
      menu={{
        items: params.items,
        onClick: e => params.onClick(e.key)
      }}
    >
      <Button size="small">
        <Space>
          <span>{params.title}</span>
          <CaretDownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );

  const renderIntegration = (agent: string) => {
    const curAgent = agents.find(e => {
      return e.agentUuid === agent;
    });

    if (!curAgent) {
      return null;
    }

    const code = renderTemplate(codeTpl, {
      sdkUrl,
      clientId: 'xxxxx',
      position: bubbleDirection,
      ...getConfigs(curAgent),
    });

    return (
      <div className={styles.integration}>
        <Space>
          {renderSelectBtn({
            title: 'Open Mode',
            items: modeOptions,
            onClick: setOpenMode
          })}
          {!isWinMode && (
            renderSelectBtn({
              title: 'Bubble direction',
              items: bubbleDirectionOptions,
              onClick: setBubbleDirection
            })
          )}
          <Button
            size="small"
            onClick={() => {
              copy(code);
              message.success('Successfully copied to clipboard.');
            }}
          >
            Copy code
          </Button>
        </Space>
        <SyntaxHighlighter
          style={dark}
          language="javascript"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

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
        <div style={{ padding: '0 16px' }}>
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
        </div>
        <Divider>Integration</Divider>
        <ProFormDependency name={['agent']}>
          {({ agent }) => renderIntegration(agent)}
        </ProFormDependency>
      </ProForm>
    </div>
  );
}

export default ReviewAgent;