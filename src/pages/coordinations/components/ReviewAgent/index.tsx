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
      agent_name: string;
    }>
  }
}

const ReviewAgent: FC<ReviewAgentProps> = (props) => {
  const { coordinationUuid, agents = [] } = props.record;
  const ref = useRef<HTMLDivElement>(null);
  const agentSdkRef = useRef<AgentSdkInstance>(undefined);

  const options = agents.map(item => {
    const id = item.agent_uuid;
    const name = item.agent_name;
    return {
      label: name || id,
      value: id
    }
  });

  const [laster] = options;

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
    agentSdkRef.current = AiChatSdk.createChat({
      openMode: 'window',
      target: ref.current!,
      clientId: 'xxxx',
      configs: getConfigs(laster?.value, laster?.label)
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
        initialValues={{
          agent: laster?.value
        }}
      >
        <ProFormSelect
          label="Agent"
          name="agent"
          fieldProps={{
            allowClear: false
          }}
          options={options}
          onChange={(_, option: any) => {
            const sdk = agentSdkRef.current;
            sdk?.updateChatConfigs(
              getConfigs(
                option?.value,
                option?.label
              )
            );
          }}
        />
      </ProForm>
      <div ref={ref} className={styles.content} />
    </div>
  );
}

export default ReviewAgent;