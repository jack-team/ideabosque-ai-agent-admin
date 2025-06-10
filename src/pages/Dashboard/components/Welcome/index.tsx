import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';
import WelcomeContent from './content';

type WelcomeProps = {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const Welcome: FC<WelcomeProps> = (props) => {
  const handleClose = useMemoizedFn(() => {
    props.onClose?.();
  });

  return (
    <Modal
      width={620}
      centered
      open={props.open}
      onCancel={handleClose}
      className="shopify"
      okText="Get started"
      title="Welcome to your AI Chat Agent Setup!"
      okButtonProps={{ className: 'shopify' }}
      cancelButtonProps={{ className: 'visb-hide' }}
    >
      <WelcomeContent
        onClose={handleClose}
        onOpen={props.onOpen}
      />
    </Modal>
  );
}

export default Welcome;