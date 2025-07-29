import { BranchesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import type { BranchFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const BranchNode: CustomNodeFC<BranchFormData> = (props) => {
  const { formData } = props.data;

  return (
    <NodeWrapper
      branch={formData.branch}
      tools={{
        editForm: {
          formData,
          width: BranchNode.modalWdith,
          title: 'Edit Branch node',
          Component: Form
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

export default BranchNode;

BranchNode.Form = Form;
BranchNode.modalWdith =  400;
BranchNode.Icon = BranchesOutlined;