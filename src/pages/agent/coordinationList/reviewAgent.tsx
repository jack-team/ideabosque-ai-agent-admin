import { type FC, useRef } from 'react';
import { useMount, useUnmount, useMemoizedFn } from 'ahooks';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import type { CoordinationDataType } from '@/typings/agent';
import { partId } from '@/env';
import styles from './styles.module.less';

type ReviewAgentProps = {
  record: CoordinationDataType;
}

const ReviewAgent: FC<ReviewAgentProps> = (props) => {
  const { coordinationUuid, agents = [] } = props.record;
  const ref = useRef<HTMLDivElement>(null);
  const agentSdkRef = useRef<AgentSdkInstance>(undefined);

  const options = agents.map(item => {
    const id = item.agentUuid;
    const name = item.agentName;
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
        userId: partId,
        endpointId: partId,
        coordination: coordinationUuid
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