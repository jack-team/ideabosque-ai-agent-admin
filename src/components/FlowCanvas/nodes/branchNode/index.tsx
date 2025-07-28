import { BranchesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import { usePrevNodesData } from '../../hooks';
import type { BranchFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
// import styles from './styles.module.less';

const BranchNode: CustomNodeFC<BranchFormData> = (props) => {
  const { formData } = props.data;
  const datas = usePrevNodesData();

  console.log(datas);

  return (
    <NodeWrapper
      nodeProps={props}
      tools={{
        editForm: {
          formData,
          width: BranchNode.modalWdith,
          title: 'Edit Branch node',
          Component: Form
        }
      }}
    >
      <div>Branch</div>
    </NodeWrapper>
  );
}

export default BranchNode;

BranchNode.Form = Form;
BranchNode.modalWdith =  400;
BranchNode.Icon = BranchesOutlined;