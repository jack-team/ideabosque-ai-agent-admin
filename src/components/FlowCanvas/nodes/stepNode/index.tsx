import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useNodeFormData } from '../../hooks';
import type { StepNodeFormData } from './types';
import type { CustomNodeFC } from '../types';
import StepIcon from '../../icons/step-icon.svg?react';
import Form from './form';

const StepNode: CustomNodeFC = () => {
  const { t } = useLang();
  const formData = useNodeFormData<StepNodeFormData>();
  
  return (
    <NodeWrapper
      branch={formData?.branch}
      tools={{
        editForm: {
          Component: Form,
          title: t('flowCanvas.editStepNode'),
          width: StepNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={t('flowCanvas.Step node')}
        desc={formData?.name}
        titleIcon={<StepIcon />}
      />
    </NodeWrapper>
  );
}

export default StepNode;

StepNode.Form = Form;
StepNode.modalWdith = 560;
StepNode.Icon = StepIcon;