import { useMemo } from 'react';
import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import styles from './styles.module.less';

const ActionNode: NodeComponent<DataType> = (props) => {
  const { data } = props;
  const values = data.values;

  const formData = useMemo(() => {
    return transformInputFormData(values.formData);
  }, [values.formData]);

  return (
    <NodeLayout {...props}>
      <div className={styles.action_node}>
        <div className={styles.action_node_header}>
          {formData.actionName}
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
    </NodeLayout>
  );
}

export default ActionNode;