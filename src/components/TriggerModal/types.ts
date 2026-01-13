import type { ReactElement, MouseEvent } from 'react';
import type { ModalProps } from 'antd';
import EventEmitter from 'eventemitter3';

export type EventListener = (e: MouseEvent) => Promise<boolean | void>;

export type NativeEventListener = (e: MouseEvent) => void;

export type TriggerProps = {
  onClick?: NativeEventListener;
}

export type TriggerModalProps = Omit<
  ModalProps,
  'destroyOnHidden' |
  'open' |
  'closable' |
  'footer' |
  'onOk' |
  'centered'
> & {
  showCancel?: boolean;
  trigger: ReactElement<TriggerProps>;
  hasFooter?: boolean;
}

export type EventType = 'ok' | 'cancel' | 'close-modal';

export type TriggerModalContextTypes = {
  event: EventEmitter<EventType>;
}

