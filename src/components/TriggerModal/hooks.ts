import { useContext, useRef } from 'react';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { TriggerModalContext } from './context';
import type { HookListener, ModalInstance } from './types';

export const useModalContext = () => {
  return useContext(TriggerModalContext);
}

export const useModal = () => {
  const ref = useRef<ModalInstance>({
    closeModal: () => null,
    openModal: () => null
  });
  return [ref.current];
}

//监听 Modal 的确定按钮
export const useListenModalOk = (listener: HookListener) => {
  const { event } = useModalContext();
  const handleOk = useMemoizedFn(listener);

  useMount(() => event.on('ok', handleOk));
  useUnmount(() => event.off('ok', handleOk));
}

//监听 Modal 取消按钮
export const useListenModalCancel = (listener: HookListener) => {
  const { event } = useModalContext();
  const handleCancel = useMemoizedFn(listener);

  useMount(() => event.on('cancel', handleCancel));
  useUnmount(() => event.off('cancel', handleCancel));
}

// 获取 Modal 的关闭函数
export const useModalClose = () => {
  const { closeModal } = useModalContext();
  return [closeModal];
}