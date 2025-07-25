import type { FC } from 'react';
import type { UiFormData } from './types';
import type { CustomNodeProps } from '../../types';
import NodeWrapper from '../../components/NodeWrapper';
import Form from './form';
import styles from './styles.module.less';

const UiNode: FC<CustomNodeProps<UiFormData>> = (props) => {
  const { formData } = props.data;
  
  return (
    <NodeWrapper
      Form={Form}
      nodeId={props.id}
      nodeProps={props}
      editFormData={formData}
      editFormTitle="Edit Ui node"
    >
      <div>{formData.description}</div>
    </NodeWrapper>
  );
}

export default UiNode;