import { useRef } from 'react';
import { useMount, useUnmount, useMemoizedFn, useSafeState } from 'ahooks';

type DefaultConfigs = {
  clientId: string;
  openMode: OpenModeType;
  enableEditTheme?: boolean;
  position?: BubblePositionType;
}

export const useAiSdk = (configs: DefaultConfigs) => {
  const target = useRef<HTMLDivElement>(null);
  const [sdk, setSdk] = useSafeState<AgentSdkInstance>();

  const createSdk = useMemoizedFn(async () => {
    const {
      openMode,
      clientId,
      enableEditTheme,
      position = 'bottomRight',
      ...rest
    } = configs;

    const sdk = AiChatSdk.createChat({
      openMode,
      clientId,
      position,
      configs: rest,
      enableEditTheme,
      target: target.current!
    });

    const data = await sdk.init();
    sdk.resultData = data;
    sdk.variables = data.data;
    setSdk(sdk);
  });

  useMount(createSdk);
  useUnmount(() => sdk?.destroy());

  return { sdk, target };
}