import { StepForwardFilled } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import type { StepNodeFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const StepNode: CustomNodeFC<StepNodeFormData> = (props) => {
  const { formData, details } = props.data;

  console.log(details);
  
  return (
    <NodeWrapper
      tools={{
        editForm: {
          formData,
          Component: Form,
          title: 'Edit Step node',
          width: StepNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={formData.name}
        desc={formData.text}
      />
    </NodeWrapper>
  );
}

export default StepNode;

StepNode.Form = Form;
StepNode.modalWdith = 400;
StepNode.Icon = StepForwardFilled;