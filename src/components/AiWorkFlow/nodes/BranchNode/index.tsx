import Handler from './handler';
import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import styles from './styles.module.less';

const BranchNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout
      {...props}
      handler={formData => (
        <Handler
          {...props}
          conditions={formData.conditions}
        />
      )}
    >
      {formData => (
        <div className={styles.branch_node}>
          <div className={styles.branch_node_header}>
            {formData.branchName}
          </div>
          <div className={styles.branch_node_body}>
            <div className={styles.branch_node_text}>
              {formData.text}
            </div>
          </div>
        </div>
      )}
    </NodeLayout>
  );
}

export default BranchNode;