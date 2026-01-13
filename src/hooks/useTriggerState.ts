import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import type { TriggerProps, NativeEventListener } from '@/components/TriggerModal/types';

export const useTriggerState = (trigger: ReactElement<TriggerProps>) => {
  const [open, setOpen] = useSafeState(false);

  const onOpen = useMemoizedFn(() => setOpen(true));

  const handleClick = useMemoizedFn<NativeEventListener>((evt) => {
    onOpen();
    trigger.props.onClick?.(evt);
  });

  const onClose = useMemoizedFn(() => {
    setOpen(false);
  });

  const node = cloneElement(trigger, {
    onClick: handleClick
  });

  return {
    open,
    onOpen,
    onClose,
    trigger: node
  };
}