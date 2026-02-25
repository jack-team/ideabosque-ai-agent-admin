import { BranchesOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import { useNodeFormData } from '../../hooks';
import NodeDesc from '../../components/NodeDesc';
import type { BranchFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const BranchNode: CustomNodeFC = () => {
  const { t } = useLang();
  const formData = useNodeFormData<BranchFormData>();

  return (
    <NodeWrapper
      branch={formData?.branch}
      tools={{
        editForm: {
          width: BranchNode.modalWdith,
          title: t('flowCanvas.editBranchNode'),
          Component: Form
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

export default BranchNode;

BranchNode.Form = Form;
BranchNode.modalWdith = 560;
BranchNode.Icon = BranchesOutlined;