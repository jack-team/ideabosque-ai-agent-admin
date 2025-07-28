import { SendOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import type { BranchFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
// import styles from './styles.module.less';

const PromptNode: CustomNodeFC<BranchFormData> = (props) => {
  const { formData } = props.data;

  return (
    <NodeWrapper
      nodeProps={props}
      tools={{
        editForm: {
          formData,
          width: PromptNode.modalWdith,
          title: 'Prompt node',
          Component: Form
        }
      }}
    >
      <div>prompt</div>
    </NodeWrapper>
  );
}

export default PromptNode;

PromptNode.Form = Form;
PromptNode.modalWdith = 360;
PromptNode.Icon = SendOutlined;