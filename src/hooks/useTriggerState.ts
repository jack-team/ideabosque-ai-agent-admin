import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';

export const useTriggerState = (trigger: ReactElement) => {
  const [open, setOpen] = useSafeState(false);

  const onOpen = useMemoizedFn(() => {
    setOpen(true);
  });

  const onClose = useMemoizedFn(() => {
    setOpen(false);
  });

  trigger = cloneElement(trigger, {
    //@ts-ignore
    onClick: onOpen
  });

  return {
    open,
    trigger,
    onClose,
    onOpen
  };
}