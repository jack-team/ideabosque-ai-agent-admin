import type { FC } from 'react';
import TriggerModal from '@/components/TriggerModal';
import type { EditStepCanvasModalProps } from './types';
import EditStepCanvas from './content';
import styles from './styles.module.less';

const EditStepCanvasModal: FC<EditStepCanvasModalProps> = (props) => {
  const { trigger, modal, ...rest } = props;
  return (
    <TriggerModal
      centered
      modal={modal}
      width="100vw"
      closable={false}
      hasFooter={false}
      trigger={trigger}
      className={styles.edit_step_modal}
    >
      <EditStepCanvas {...rest}/>
    </TriggerModal>
  )
}

export default EditStepCanvasModal;