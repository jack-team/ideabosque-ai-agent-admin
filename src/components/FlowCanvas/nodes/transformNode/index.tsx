import { useMemo } from 'react';
import { BlockOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext } from '../../hooks';
import type { TransformNodeFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const TransformNode: CustomNodeFC<TransformNodeFormData> = (props) => {
  const { formData } = props.data;
  const transformType = formData.type;
  const { transformTools = [] } = useFlowContext();

  const tool = useMemo(() => {
    return transformTools.find(e => e.value === transformType);
  }, [transformTools, transformType]);

  return (
    <NodeWrapper
      tools={{
        editForm: {
          formData,
          width: TransformNode.modalWdith,
          title: 'Edit Transform node',
          Component: Form
        }
      }}
    >
      <NodeDesc 
        title={tool?.label}
        desc={formData.text}
      />
    </NodeWrapper>
  );
}

export default TransformNode;

TransformNode.Form = Form;
TransformNode.modalWdith = 450;
TransformNode.Icon = BlockOutlined;