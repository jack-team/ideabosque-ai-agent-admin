import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import type {  FormDataType } from './types';
import styles from './styles.module.less';

const ActionNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout<FormDataType> {...props}>
      {formData => (
        <div className={styles.action_node}>
          <div className={styles.action_node_header}>
            Action Node
          </div>
          <div className={styles.action_node_body}>
            <div className={styles.action_node_text}>
              {formData.type}
            </div>
            <div className={styles.action_node_text}>
              {formData.text}
            </div>
          </div>
        </div>
      )}
    </NodeLayout>
  );
}

export default ActionNode;