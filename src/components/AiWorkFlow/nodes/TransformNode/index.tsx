import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import styles from './styles.module.less';

const TransformNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout {...props}>
      {formData => (
        <div className={styles.transform_node}>
          <div className={styles.transform_node_header}>
            {formData.nodeName}
          </div>
          <div className={styles.transform_node_body}>
            <div className={styles.transform_node_text}>
              {formData.type}
            </div>
            <div className={styles.transform_node_text}>
              {formData.text}
            </div>
          </div>
        </div>
      )}
    </NodeLayout>
  );
}

export default TransformNode;