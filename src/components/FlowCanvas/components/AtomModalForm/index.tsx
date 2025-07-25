import type { FC } from 'react';
import TriggerModal from '@/components/TriggerModal';
import type { AtomModalFormProps } from './types';
import AtomForm from './form';

const AtomModalForm: FC<AtomModalFormProps> = (props) => {
  const {
    edit,
    formData,
    columns,
    children,
    atomName,
    onSubmit,
    ...rest
  } = props;

  return (
    <TriggerModal
      {...rest}
      trigger={children}
      okText={edit ? 'Save' : 'Add Node'}
      title={`${edit ? 'Edit' : 'Add'} ${atomName}`}
    >
      <AtomForm
        formData={formData}
        columns={columns}
        onSubmit={onSubmit}
      />
    </TriggerModal>
  );
}

export default AtomModalForm;