import { useContext } from 'react';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { TriggerModalContext } from './context';
import type { EventListener } from './types';

const useEvent = () => {
  const { event } = useContext(TriggerModalContext);
  return [event];
}

// 监听Ok 按钮点击
export const useModalOkClick = (listener: EventListener) => {
  const [event] = useEvent();
  const handler = useMemoizedFn(listener);

  useMount(() => {
    event.on('ok', handler);
  });

  useUnmount(() => {
    event.off('ok', handler);
  });
}

// 监听Cancel 按钮点击
export const useModalCancelClick = (listener: EventListener) => {
  const [event] = useEvent();
  const handler = useMemoizedFn(listener);

  useMount(() => {
    event.on('cancel', handler);
  });

  useUnmount(() => {
    event.off('cancel', handler);
  });
}

// 关闭Modal
export const useModalClose = () => {
  const [event] = useEvent();

  const closeModal = useMemoizedFn(() => {
    event.emit('close-modal');
  });

  return [closeModal];
}