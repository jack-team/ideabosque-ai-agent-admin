import { App } from 'antd';
import { useListenModalCancel } from '@/components/TriggerModal';

export const useEditModalClose = () => {
  const { modal } = App.useApp();
  
  useListenModalCancel(() => {
    return new Promise((reslove, reject) => {
      modal.confirm({
        title: 'Are you sure you want to close?',
        content: 'The current content will be lost after closing.',
        okText: 'Close',
        onOk: () => reslove(),
        onCancel: () => reject(),
        okButtonProps: { className: 'shopify' },
        cancelButtonProps: { className: 'shopify' }
      });
    });
  });
}