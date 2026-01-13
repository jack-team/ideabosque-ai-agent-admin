import { Modal } from 'antd';
import EventEmitter from 'eventemitter3';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSafeState, useMemoizedFn, useUnmount, useMount } from 'ahooks';
import { type FC, type MouseEvent, Fragment, cloneElement, useMemo } from 'react';
import type { TriggerModalProps, EventType, EventListener } from './types';
import { TriggerModalContext } from './context';
import Button from '../Button';

export * from './hooks';

const TriggerModal: FC<TriggerModalProps> = (props) => {
  const {
    trigger,
    children,
    showCancel = true,
    hasFooter = true,
    okText = "Save",
    cancelText = "Back",
    ...rest
  } = props;

  const [loading, setLoading] = useSafeState(false);
  const [modalOpen, setModalOpen] = useSafeState(false);
  const onTrigger = useMemoizedFn(() => setModalOpen(true));
  const event = useMemo(() => new EventEmitter<EventType>(), []);

  const closeModal = useMemoizedFn(() => {
    if (loading) return;
    setModalOpen(false)
  });

  const getListeners = useMemoizedFn((type: EventType) => {
    return event.listeners(type) as EventListener[];
  });

  const runListeners = useMemoizedFn(async (listeners: EventListener[], e: MouseEvent) => {
    let prevent = false;
    for (const listsener of listeners) {
      try {
        const pass = await listsener(e) ?? true;
        if (pass === false) {
          prevent = true;
          break;
        }
      }
      catch (err) {
        console.error(err);
        prevent = true;
        break;
      }
    }
    return prevent;
  });

  // 点击确定按钮
  const onConfirm = useMemoizedFn(async (e: MouseEvent) => {
    setLoading(true);
    const prevent = await runListeners(getListeners('ok'), e);
    if (!prevent) requestAnimationFrame(closeModal);
    setLoading(false);
  });

  // 点击取消按钮
  const onCancel = useMemoizedFn(async (e: MouseEvent) => {
    const prevent = await runListeners(getListeners('cancel'), e);
    if (!prevent) requestAnimationFrame(closeModal);
  });

  const renderFooter = () => {
    if (!hasFooter) {
      return null;
    }
    return (
      <Fragment>
        {showCancel && (
          <Button
            type="text"
            onClick={onCancel}
            disabled={loading}
            icon={<ArrowLeftOutlined />}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="primary"
          loading={loading}
          onClick={onConfirm}
        >
          {okText}
        </Button>
      </Fragment>
    );
  }

  useUnmount(() => {
    event.removeAllListeners();
  });

  useMount(() => {
    event.on('close-modal', closeModal);
  });

  return (
    <TriggerModalContext.Provider value={{ event }}>
      {cloneElement(trigger, { onClick: onTrigger })}
      <Modal
        {...rest}
        centered
        destroyOnHidden
        open={modalOpen}
        closable={!loading}
        onCancel={closeModal}
        footer={renderFooter()}
      >
        {children}
      </Modal>
    </TriggerModalContext.Provider>
  );
}

export default TriggerModal;