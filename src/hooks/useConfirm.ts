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
      title: options.title,
      content: options.content,
      okText: options.okText,
      cancelText: options.cancelText,
      onOk: () => {
        options.onConfirm?.();
        instance.destroy();
      },
      cancelButtonProps: {
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

