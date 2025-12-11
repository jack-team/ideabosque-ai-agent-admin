import { App } from 'antd';
import { useMemoizedFn } from 'ahooks';

type ConfirmOptions = {
  title: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const useConfirm = () => {
  const { modal } = App.useApp();

  const confirm = useMemoizedFn((options: ConfirmOptions) => {
    const instance = modal.confirm({
      closable: true,
      rootClassName: 'shopify',
      title: options.title,
      content: options.content,
      okText: options.okText,
      cancelText: options.cancelText,
      okButtonProps: {
        className: 'shopify',
        onClick: () => {
          options.onConfirm?.();
          instance.destroy();
        }
      },
      cancelButtonProps: {
        className: 'shopify',
        onClick: () => {
          options.onCancel?.();
          instance.destroy();
        }
      },
      onCancel: options.onClose
    });
  });

  return [confirm];
}

