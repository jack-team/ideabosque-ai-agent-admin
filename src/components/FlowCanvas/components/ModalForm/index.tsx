import type { FC } from 'react';
import TriggerModal from '@/components/TriggerModal';
import type { ModalFormProps } from './types';
import Form from './form';

const ModalForm: FC<ModalFormProps> = (props) => {
  const {
    children,
    onSubmit,
    formData,
    ...rest
  } = props;

  return (
    <TriggerModal {...rest}>
      <Form
        formData={formData}
        onSubmit={onSubmit}
        children={children}
      />
    </TriggerModal>
  );
}

export default ModalForm;