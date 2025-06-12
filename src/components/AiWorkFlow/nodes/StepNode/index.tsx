import NodeLayout from '../../components/NodeLayout';
import type { NodeComponent } from '../../types';
import type { DataType } from '../../components/NodeLayout/types';
import type { FormDataType, } from './types';
import Handler from './handler';
import styles from './styles.module.less';

const StepNode: NodeComponent<DataType> = (props) => {
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
          </div>
        );
      }}
    </NodeLayout>
  );
}

export default StepNode;