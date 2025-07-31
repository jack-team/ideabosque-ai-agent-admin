import { StepForwardFilled } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useNodeFormData } from '../../hooks';
import type { StepNodeFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const StepNode: CustomNodeFC = () => {
  const formData = useNodeFormData<StepNodeFormData>();
  
  return (
    <NodeWrapper
      tools={{
        editForm: {
          Component: Form,
          title: 'Edit Step node',
          width: StepNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={formData?.name}
        desc={formData?.text}
      />
    </NodeWrapper>
  );
}

export default StepNode;

StepNode.Form = Form;
StepNode.modalWdith = 380;
StepNode.Icon = StepForwardFilled;