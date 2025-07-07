import type { FC, MouseEvent } from 'react';
import { Fragment, useMemo, useEffect } from 'react';
import { useMemoizedFn, useUpdateEffect, useSafeState } from 'ahooks';
import { Modal } from 'antd';
import classNames from 'classnames';
import EventEmitter from 'eventemitter3';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTriggerState } from '@/hooks/useTriggerState';
import { ShopifyButton } from '@/components';
import { TriggerModalContext } from './context';
import type { TriggerModalProps, EventType } from './types';
export * from './hooks';

const TriggerModal: FC<TriggerModalProps> = (props) => {
  const {
    modal,
    okText,
    onOpen,
    onClose,
    trigger,
    className,
    rootClassName,
    hasFooter = true,
    cancelText = 'Back',
    showCancel = true,
    ...rest
  } = props;

  const [
    runing,
    setRuning
  ] = useSafeState(false);

  const {
    open: modalOpen,
    onClose: closeModal,
    onOpen: openModal,
    trigger: triggerNode
  } = useTriggerState(trigger);

  const restProps = useMemo(() => {
    if (runing) {
      return {
        ...rest,
        closable: false,
      }
    }
    return rest;
  }, [rest, runing])

  const event = useMemo(() => {
    return new EventEmitter<EventType>();
  }, []);

  const getEventTasks = useMemoizedFn(
    (type: EventType, e: MouseEvent) =>
      event.listeners(type).map(f => f(e))
  );

  const handleOk = useMemoizedFn(async (e: MouseEvent) => {
    setRuning(true);
    try {
      await Promise.all(getEventTasks('ok', e));
    } catch (err) {
      console.error(err);
    }
    setRuning(false);
  });

  const handleCancel = useMemoizedFn(async (e: MouseEvent) => {
    if (runing) return;
    await Promise.all(getEventTasks('cancel', e));
    closeModal();
  });

  useEffect(() => {
    if (modal) {
      modal.closeModal = closeModal;
      modal.openModal = openModal;
    }
  }, [modal]);

  useUpdateEffect(() => {
    if (modalOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [modalOpen]);

  return (
    <TriggerModalContext.Provider
      value={{ event, closeModal }}
    >
      {triggerNode}
      <Modal
        {...restProps}
        open={modalOpen}
        onCancel={handleCancel}
        rootClassName={classNames(
          'shopify', rootClassName
        )}
        className={className}
        footer={hasFooter ?
          <Fragment>
            <ShopifyButton
              type="text"
              children={cancelText}
              onClick={handleCancel}
              icon={<ArrowLeftOutlined />}
              className={(!showCancel || runing) ? 'visb-hide' : ''}
            />
            <ShopifyButton
              type="primary"
              children={okText}
              onClick={handleOk}
            />
          </Fragment> : null
        }
      />
    </TriggerModalContext.Provider>
  );
}

export default TriggerModal;