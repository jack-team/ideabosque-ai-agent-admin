import { useLang } from '@/hooks/useLang';
import { useNodeFormData } from '../../hooks';
import NodeDesc from '../../components/NodeDesc';
import NodeWrapper from '../../components/NodeWrapper';
import type { BranchFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
import BrachIcon from '../../icons/brach-icon.svg?react';

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
        title={t('flowCanvas.Branch node')}
        desc={formData?.name}
        titleIcon={<BrachIcon />}
      />
    </NodeWrapper>
  );
}

export default BranchNode;

BranchNode.Form = Form;
BranchNode.modalWdith = 560;
BranchNode.Icon = BrachIcon;