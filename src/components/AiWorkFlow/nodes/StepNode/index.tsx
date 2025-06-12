import { Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { EditFilled } from '@ant-design/icons';
import { TriggerModal } from '@/components';
import { useAiWorkFlowContext } from '../../hooks';
import NodeLayout from '../../components/NodeLayout';
import type { NodeComponent, FlowSaveResult } from '../../types';
import type { DataType } from '../../components/NodeLayout/types';
import type { FormDataType, } from './types';
import EditStep from './editStep';
import Handler from './handler';
import styles from './styles.module.less';

const StepNode: NodeComponent<DataType> = (props) => {
  const data = props.data;
  const { nodeType } = data.values;
  const { updateNodeData } = useAiWorkFlowContext();

  const onEditStep = useMemoizedFn((result: FlowSaveResult) => {
    data.values.stepRealData = result;
    updateNodeData(props.id, data);
  });

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