import { useRef } from 'react'
import { useMemoizedFn, useMount, useUnmount, useSafeState } from 'ahooks';

type UseAgentSdkOptions = {
  agentName?: string;
  floatBubbleOffsetX: number;
}

export const useAgentSdk = (options?: UseAgentSdkOptions) => {
  const agentName = options?.agentName || 'Chat Assistant';
  const bubbleOffsetX = options?.floatBubbleOffsetX ?? 56;

  const targetRef = useRef<HTMLDivElement>(null);
  const [agentSdk, setAgentSdk] = useSafeState<AgentSdkInstance>();
  const destroySdk = useMemoizedFn(() => agentSdk?.destroy());

  const createChat = useMemoizedFn(async () => {
    const sdk = AiChatSdk.createChat({
      enableEditTheme: true,
      position: 'bottomRight',
      target: targetRef.current!,
      configs: { agentName }
    });

    const result = await sdk.init();
    sdk.variables = result.data;
    setAgentSdk(sdk);

    sdk.bubbleExpand();

    sdk.updateThemeConfigs({
      cssVariables: {
        floatBubbleOffsetX: `${bubbleOffsetX}px`
      }
    });
  });

  useMount(createChat);
  useUnmount(destroySdk);

  return {
    agentSdk,
    targetRef
  };
}