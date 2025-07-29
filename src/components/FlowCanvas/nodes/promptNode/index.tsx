import { SendOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import type { PromptNodeFormData } from './types';
import { PromptTypesMap } from './enum';
import type { CustomNodeFC } from '../types';
import Form from './form';

const PromptNode: CustomNodeFC<PromptNodeFormData> = (props) => {
  const { formData } = props.data;
  const promptType = formData.type;

  return (
    <NodeWrapper
      tools={{
        editForm: {
          formData,
          width: PromptNode.modalWdith,
          title: 'Edit Prompt node',
          Component: Form
        }
      }}
    >
      <NodeDesc 
        title={PromptTypesMap[promptType]}
        desc={formData.text}
      />
    </NodeWrapper>
  );
}

export default PromptNode;

PromptNode.Form = Form;
PromptNode.modalWdith = 360;
PromptNode.Icon = SendOutlined;