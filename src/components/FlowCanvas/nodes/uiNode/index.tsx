import { KubernetesOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext, useNodeFormData } from '../../hooks';
import type { UiFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
import uiIcon from '../../icons/ui-icon.svg';

const UiNode: CustomNodeFC = () => {
  const { t } = useLang();
  const formData = useNodeFormData<UiFormData>();
  const { uiComponents = [] } = useFlowContext();

  const component = uiComponents.find(e => {
    return e.componentTag === formData?.name;
  });

  return (
    <NodeWrapper
      tools={{
        editForm: {
          Component: Form,
          title: t('flowCanvas.editUiNode'),
          width: UiNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={component?.componentName}
        desc={formData?.text}
        titleIcon={<img src={uiIcon} />}
      />
    </NodeWrapper>
  );
}

export default UiNode;

UiNode.Form = Form;
UiNode.modalWdith = 560;
UiNode.Icon = KubernetesOutlined;