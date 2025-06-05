import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Modal } from '@shopify/polaris'
import WelcomeContent from './content';

type WelcomeProps = {
  open: boolean;
  onClose?: () => void;
}

const Welcome: FC<WelcomeProps> = (props) => {
  const handleClose = useMemoizedFn(() => {
    props.onClose?.();
  });

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      title="Welcome to your AI Chat Agent Setup!"
      primaryAction={{
        content: 'Get started',
        onAction: handleClose,
      }}
    >
      <WelcomeContent />
    </Modal>
  );
}

export default Welcome;