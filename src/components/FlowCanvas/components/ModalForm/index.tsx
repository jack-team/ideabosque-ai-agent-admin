import type { FC } from 'react';
import TriggerModal from '@/components/TriggerModal';
import type { ModalFormProps } from './types';
import AtomForm from './form';

const ModalForm: FC<ModalFormProps> = (props) => {
  const {
    children,
    onSubmit,
    ...rest
  } = props;

  return (
    <TriggerModal {...rest}>
      <AtomForm
        onSubmit={onSubmit}
        children={children}
      />
    </TriggerModal>
  );
}

export default ModalForm;