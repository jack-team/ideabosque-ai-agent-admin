import { useRef } from 'react';
import { useMount, useUnmount, useMemoizedFn, useSafeState } from 'ahooks';
import { partId } from '@/env';

type DefaultOptions = {
  openMode?: OpenModeType;
  position?: BubblePositionType;
  configs?: {
    agent: string;
    question?: string;
    coordination: string;
  }
}

export const useAiSdk = (options: DefaultOptions) => {
  const target = useRef<HTMLDivElement>(null);
  const [sdk, setSdk] = useSafeState<AgentSdkInstance>();

  const createSdk = useMemoizedFn(async () => {
    const { openMode, position, configs } = options;

    const createChatOptions: Record<string, any> = {
      target: target.current!,
      defaultOpenMode: openMode,
      defaultPosition: position,
    }

    if (configs) {
      createChatOptions.configs = {
        partId: partId(),
        userId: partId(),
        ...configs
      }
    }

    const sdk = AiChatSdk.createChat(createChatOptions);

    const data = await sdk.init();
    sdk.resultData = data;
    sdk.variables = data.data;

    setSdk(sdk);
  });

  useMount(createSdk);
  useUnmount(() => sdk?.destroy());

  return { sdk, target };
}