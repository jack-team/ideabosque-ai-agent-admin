import type { FC } from 'react';
import { useRef } from 'react';
import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import AiWorkFlow from '../..';
import { ShopifyButton } from '@/components';
import { useEditModalClose } from './hooks';
import { useModalClose } from '@/components/TriggerModal';
import type { AiWorkFlowInstance } from '../../types';
import type { EditStepProps } from './types';
import styles from './styles.module.less';

const EditStep: FC<EditStepProps> = (props) => {
  const { message } = App.useApp();
  const [closeModal] = useModalClose();
  const flowInstance = useRef<AiWorkFlowInstance>(null);

  const getResult = useMemoizedFn(() => {
    return flowInstance.current!.getData();
  });

  const onSave = useMemoizedFn(() => {
    const result = getResult();
    if (!result.edges.length) {
      message.error('The current flowchart is not completed.');
      return;
    }
    props.onSave?.(result);
    closeModal();
  });

  useEditModalClose();

  return (
    <div className={styles.edit_step}>
      <div className={styles.edit_step_header}>
        <Space>
          <ShopifyButton
            type="primary"
            onClick={onSave}
          >
            Save
          </ShopifyButton>
        </Space>
      </div>
      <div className={styles.edit_step_content}>
        <AiWorkFlow
          isStep={false}
          ref={flowInstance}
        />
      </div>
    </div>
  );
}

export default EditStep;