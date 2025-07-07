import type { ReactElement, MouseEvent, MouseEventHandler } from 'react';
import type { ModalProps } from 'antd';
import EventEmitter from 'eventemitter3';

export type EventHandler = MouseEventHandler<HTMLElement>;

export type ModalInstance = {
  closeModal: () => void;
  openModal: () => void;
}

export type TriggerProps = {
  onClick?: EventHandler;
}

export type TriggerModalProps = {
  trigger: ReactElement<TriggerProps>;
  showCancel?: boolean;
  modal?: ModalInstance;
  onOpen?: () => void;
  onClose?: () => void;
  hasFooter?: boolean;
} & Omit<
  ModalProps,
  'open' |
  'onOk' |
  'onCancel' |
  'okButtonProps' |
  'cancelButtonProps'
>;

export type EventType = 'ok' | 'cancel' | 'close';

export type TriggerModalContextTypes = {
  event: EventEmitter<EventType>;
  closeModal: () => void;
}

export type HookListener = (e: MouseEvent) => Promise<void>;