import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import type { FormDataType } from './types';
import styles from './styles.module.less';

const TransformNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout<FormDataType> {...props}>
      {formData => (
        <div className={styles.transform_node}>
          <div className={styles.transform_node_header}>
            Transform Node
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