import { Modal, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import ConfirmInput from '@/components/ConfirmInput';

type ConfirmOptions = {
  title: string;
  content?: any;
  okText?: string;
  staticFn?: boolean;
  cancelText?: string;
  onClose?: () => void;
  onCancel?: () => void;
  enableConfirm?: boolean;
  onConfirm?: () => void | Promise<void>;
}

export const useConfirm = () => {
  const { modal } = App.useApp();

  const confirm = useMemoizedFn((options: ConfirmOptions) => {
    const { enableConfirm = false, staticFn = false } = options;
    const fn = staticFn ? Modal.confirm : modal.confirm;

    const instance = fn({
      closable: false,
      wrapClassName: 'global-confirm-wrapper',
      title: options.title,
      content: (
        <div>
          {options.content}
          {enableConfirm && (
            <ConfirmInput
              onConfirm={c => {
                instance.update({
                  okButtonProps: {
                    disabled: !c
                  }
                })
              }}
            />
          )}
        </div>
      ),
      okText: options.okText,
      cancelText: options.cancelText,
      okButtonProps: { disabled: enableConfirm },
      onOk: async () => {
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

