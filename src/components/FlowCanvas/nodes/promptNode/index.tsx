import { SendOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useNodeFormData } from '../../hooks';
import type { PromptNodeFormData } from './types';
import { PromptTypesMap } from './enum';
import type { CustomNodeFC } from '../types';
import Form from './form';

const PromptNode: CustomNodeFC = () => {
  const { t } = useLang();
  const formData = useNodeFormData<PromptNodeFormData>();
  const promptType = formData?.type;

  return (
    <NodeWrapper
      tools={{
        editForm: {
          width: PromptNode.modalWdith,
          title: t('flowCanvas.editPromptNode'),
          Component: Form
        }
      }}
    >
      <NodeDesc
        title={promptType && t(PromptTypesMap[promptType])}
        desc={formData?.text}
      />
    </NodeWrapper>
  );
}

export default PromptNode;

PromptNode.Form = Form;
PromptNode.modalWdith = 560;
PromptNode.Icon = SendOutlined;