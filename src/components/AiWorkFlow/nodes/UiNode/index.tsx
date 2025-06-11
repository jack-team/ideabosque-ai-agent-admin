import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import styles from './styles.module.less';

const UiNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout {...props}>
      {(formData) => (
        <div className={styles.ui_node}>
          <div className={styles.ui_node_header}>
            {formData.name}
          </div>
          <div className={styles.ui_node_body}>
            <div className={styles.ui_node_text}>
              {formData.text}
            </div>
          </div>
        </div>
      )}
    </NodeLayout>
  );
}

export default UiNode;