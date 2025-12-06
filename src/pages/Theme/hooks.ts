import { useRef } from 'react'
import { useMemoizedFn, useMount, useUnmount, useSafeState } from 'ahooks';

export const useAiSdk = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [sdk, setSdk] = useSafeState<Record<string, any>>();
  const [openMode, setOpenMode] = useSafeState<string>('bubble');
  const destroySdk = useMemoizedFn(() => sdk?.destroy());

  const createChat = useMemoizedFn((mode = 'bubble') => {
    const newSdk = AiChatSdk.createChat({
      openMode: mode,
      enableEditTheme: true,
      position: 'bottomRight',
      target: targetRef.current!,
      configs: { agentName: 'B2B Chat Agent' }
    });

    newSdk.init();
    newSdk.bubbleExpand();

    newSdk.updateThemeConfigs({
      bubbleThemeConfigs: {
        floatBubbleOffsetX: '56px'
      }
    });

    setSdk(newSdk);
    setOpenMode(mode);
  });

  const updateChatMode = useMemoizedFn(async (mode = 'bubble') => {
    if (openMode === mode) return;
    destroySdk();
    createChat(mode);
  });

  useMount(createChat);
  useUnmount(destroySdk);

  return {
    sdk,
    targetRef,
    updateChatMode
  };
}