import type { FC, MouseEvent } from 'react';
import { Fragment, useMemo, useEffect } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import EventEmitter from 'eventemitter3';
import { ShopifyButton } from '@/components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMemoizedFn, useUpdateEffect } from 'ahooks';
import { useTriggerState } from '@/hooks/useTriggerState';
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
    hasFooter = true,
    cancelText = 'Back',
    showCancel = true,
    ...rest
  } = props;

  const {
    open: modalOpen,
    onClose: closeModal,
    onOpen: openModal,
    trigger: triggerNode
  } = useTriggerState(trigger);

  const event = useMemo(() => {
    return new EventEmitter<EventType>();
  }, []);

  const getEventTasks = useMemoizedFn(
    (type: EventType, e: MouseEvent) =>
      event.listeners(type).map(f => f(e))
  );

  const handleOk = useMemoizedFn(async (e: MouseEvent) => {
    await Promise.all(getEventTasks('ok', e));
  });

  const handleCancel = useMemoizedFn(async (e: MouseEvent) => {
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
        {...rest}
        open={modalOpen}
        onCancel={handleCancel}
        className={classNames(
          'shopify', className
        )}
        footer={hasFooter ?
          <Fragment>
            <ShopifyButton
              type="text"
              children={cancelText}
              onClick={handleCancel}
              icon={<ArrowLeftOutlined />}
              className={!showCancel ? 'visb-hide' : ''}
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