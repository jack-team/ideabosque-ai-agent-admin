import type { FC, MouseEvent } from 'react';
import { cloneElement, Fragment, useMemo, useEffect } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import EventEmitter from 'eventemitter3';
import { ShopifyButton } from '@/components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { TriggerModalContext } from './context';
import type { TriggerModalProps, EventType } from './types';

const TriggerModal: FC<TriggerModalProps> = (props) => {
  const {
    modal,
    okText,
    onOpen,
    onClose,
    trigger,
    className,
    cancelText = 'Back',
    showCancel = true,
    ...rest
  } = props;

  const [
    modalOpen,
    setModalOpen
  ] = useSafeState(false);

  const event = useMemo(() => {
    return new EventEmitter<EventType>();
  }, []);

  const openModal = useMemoizedFn(() => {
    setModalOpen(true);
    onOpen?.();
  });

  const closeModal = useMemoizedFn(() => {
    setModalOpen(false);
    onClose?.();
  });

  const handleOk = useMemoizedFn(async (e: MouseEvent) => {
    const tasks = event.listeners('ok').map(f => f(e));
    await Promise.all(tasks);
  });

  const handleCancel = useMemoizedFn(async (e: MouseEvent) => {
    const tasks = event.listeners('cancel').map(f => f(e));
    await Promise.all(tasks);
    closeModal();
  });

  useEffect(() => {
    if (modal) {
      modal.closeModal = closeModal;
    }
  }, [modal]);

  return (
    <TriggerModalContext.Provider
      value={{ event, closeModal }}
    >
      {cloneElement(trigger, {
        //@ts-ignore
        onClick: openModal
      })}
      <Modal
        {...rest}
        open={modalOpen}
        onCancel={handleCancel}
        className={classNames(
          'shopify', className
        )}
        footer={
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
          </Fragment>
        }
      />
    </TriggerModalContext.Provider>
  );
}

export default TriggerModal;