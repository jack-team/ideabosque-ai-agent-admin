import { useMemo } from 'react';
import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import styles from './styles.module.less';

const TransformNode: NodeComponent<DataType> = (props) => {
  const { data } = props;
  const values = data.values;

  const formData = useMemo(() => {
    return transformInputFormData(values.formData);
  }, [values.formData]);

  return (
    <NodeLayout {...props}>
      <div className={styles.transform_node}>
        <div className={styles.transform_node_header}>
          {formData.transformName}
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
    </NodeLayout>
  );
}

export default TransformNode;