import type { NodeComponent } from '../../types';
import NodeLayout from '../../components/NodeLayout';
import type { DataType } from '../../components/NodeLayout/types';
import type { FormDataType } from './types';
import styles from './styles.module.less';

const Types: Record<FormDataType['type'], string> = {
  text: 'Text',
  prompt: 'Prompt'
}

const PromptNode: NodeComponent<DataType> = (props) => {
  return (
    <NodeLayout<FormDataType> {...props}>
      {(formData) => (
        <div className={styles.prompt_node}>
          <div className={styles.prompt_node_header}>
            {Types[formData.type]} Node
          </div>
          <div className={styles.prompt_node_body}>
            <div className={styles.prompt_node_text}>
              {formData.text || formData.prompt}
            </div>
          </div>
        </div>
      )}
    </NodeLayout>
  );
}

export default PromptNode;