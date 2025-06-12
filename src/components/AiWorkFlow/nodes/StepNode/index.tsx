import { Button } from 'antd';
import { useMemoizedFn, useMount } from 'ahooks';
import { EditFilled } from '@ant-design/icons';
import { useAiWorkFlowContext } from '../../hooks';
import NodeLayout from '../../components/NodeLayout';
import type { NodeComponent, FlowSaveResult } from '../../types';
import type { DataType } from '../../components/NodeLayout/types';
import TriggerModal, { useModal } from '@/components/TriggerModal';
import type { FormDataType, } from './types';
import EditStep from './editStep';
import Handler from './handler';
import styles from './styles.module.less';

const StepNode: NodeComponent<DataType> = (props) => {
  const data = props.data;
  const values = data.values;
  const { nodeType } = values;

  const [modal] = useModal();
  const { updateNodeData } = useAiWorkFlowContext();

  const onEditStep = useMemoizedFn((result: FlowSaveResult) => {
    values.stepRealData = result;
    updateNodeData(props.id, data);
  });

  const onLaunchFlowCanvas = useMemoizedFn(() => {
    if (nodeType === 'step' && !values.stepRealData) {
      requestAnimationFrame(() => modal.openModal());
    }
  });

  useMount(onLaunchFlowCanvas);

  return (
    <NodeLayout<FormDataType>
      {...props}
      handler={formData => {
        const conditions = formData.conditions;
        if (conditions?.length) {
          return (
            <Handler
              {...props}
              conditions={formData.conditions}
            />
          );
        }
      }}
    >
      {formData => {
        return (
          <div className={styles.step_node}>
            <div className={styles.step_node_header}>
              {formData.name}
            </div>
            <div className={styles.step_node_body}>
              <div className={styles.step_node_text}>
                {formData.text || formData.description}
              </div>
            </div>
            {nodeType === 'step' && (
              <div className={styles.actions}>
                <TriggerModal
                  centered
                  modal={modal}
                  width="100vw"
                  hasFooter={false}
                  title="Edit Step"
                  className={styles.edit_step_modal}
                  trigger={
                    <Button className="shopify">
                      <EditFilled />Edit Step
                    </Button>
                  }
                >
                  <EditStep
                    onSave={onEditStep}
                    {...data.values.stepRealData}
                  />
                </TriggerModal>
              </div>
            )}
          </div>
        );
      }}
    </NodeLayout>
  );
}

export default StepNode;