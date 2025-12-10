import { type FC, useRef } from 'react';
import { useMount, useUnmount, useMemoizedFn } from 'ahooks';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { getAiEndpoint } from '@/libs/graphql'
import styles from './styles.module.less';

type ReviewAgentProps = {
  record: {
    coordinationUuid: string;
    agents: Array<{
      agent_uuid: string;
    }>
  }
}

const ReviewAgent: FC<ReviewAgentProps> = (props) => {
  const { coordinationUuid, agents = [] } = props.record;
  const ref = useRef<HTMLDivElement>(null);
  const agentSdkRef = useRef<AgentSdkInstance>(undefined);

  const options = agents.map(item => {
    return {
      label: item.agent_uuid,
      value: item.agent_uuid
    }
  });

  const initValue = {
    agent: options[0]?.value
  };

  const getConfigs = useMemoizedFn(
    (agent, agentName = 'B2B Chat Agent') => {
      return {
        agent,
        agentName,
        userId: 'Admin',
        endpointId: getAiEndpoint(),
        coordination: coordinationUuid,
      }
    }
  );

  useMount(() => {
    const agent = initValue.agent;
    agentSdkRef.current = AiChatSdk.createChat({
      openMode: 'window',
      target: ref.current!,
      clientId: 'xxxx',
      configs: getConfigs(agent, agent)
    });
    agentSdkRef.current.init();
  });

  useUnmount(() => {
    agentSdkRef.current?.destroy();
  });

  return (
    <div className={styles.container}>
      <ProForm
        submitter={false}
        initialValues={initValue}
      >
        <ProFormSelect
          label="Agent"
          name="agent"
          options={options}
          onChange={e => {
            const sdk = agentSdkRef.current;
            sdk?.updateChatConfigs(getConfigs(e, e));
          }}
        />
      </ProForm>
      <div ref={ref} className={styles.content} />
    </div>
  );
}

export default ReviewAgent;