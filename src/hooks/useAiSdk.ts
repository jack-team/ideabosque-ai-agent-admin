import { useRef } from 'react';
import { useMount, useUnmount, useMemoizedFn, useSafeState } from 'ahooks';

type DefaultConfigs = {
  clientId: string;
  openMode: OpenModeType;
}

export const useAiSdk = (configs: DefaultConfigs) => {
  const target = useRef<HTMLDivElement>(null);
  const [sdk, setSdk] = useSafeState<AgentSdkInstance>();

  const init = useMemoizedFn(async () => {
    const { openMode, clientId, ...rest } = configs;
    const sdk = AiChatSdk.createChat({
      openMode,
      clientId,
      configs: rest,
      target: target.current!
    });
    const data = await sdk.init();
    sdk.resultData = data;
    setSdk(sdk);
  });

  useMount(init);
  useUnmount(() => sdk?.destroy());

  return { sdk, target };
}