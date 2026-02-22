import { App } from 'antd';
import { useMemoizedFn } from 'ahooks';

type ConfirmOptions = {
  title: string;
  content?: any;
  okText?: string;
  cancelText?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void>;
}

export const useConfirm = () => {
  const { modal } = App.useApp();

  const confirm = useMemoizedFn((options: ConfirmOptions) => {
    const instance = modal.confirm({
      closable: false,
      title: options.title,
      content: options.content,
      okText: options.okText,
      cancelText: options.cancelText,
      onOk: async () => {
        // @ts-ignore
        await options.onConfirm?.();
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

