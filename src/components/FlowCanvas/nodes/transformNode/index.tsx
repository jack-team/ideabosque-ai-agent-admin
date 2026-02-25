import { useMemo } from 'react';
import { BlockOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext, useNodeFormData } from '../../hooks';
import type { TransformNodeFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const TransformNode: CustomNodeFC = () => {
  const { t } = useLang();
  const { transformTools = [] } = useFlowContext();
  const formData = useNodeFormData<TransformNodeFormData>();

  const tool = useMemo(() => {
    return transformTools.find(e => e.value === formData?.type);
  }, [transformTools, formData?.type]);

  return (
    <NodeWrapper
      tools={{
        editForm: {
          width: TransformNode.modalWdith,
          title: t('flowCanvas.editTransformNode'),
          Component: Form
        }
      }}
    >
      <NodeDesc 
        title={tool?.label}
        desc={formData?.text}
      />
    </NodeWrapper>
  );
}

export default TransformNode;

TransformNode.Form = Form;
TransformNode.modalWdith = 560;
TransformNode.Icon = BlockOutlined;