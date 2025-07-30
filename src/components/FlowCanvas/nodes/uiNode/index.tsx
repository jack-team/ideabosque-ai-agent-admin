import { KubernetesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext, useNodeFormData } from '../../hooks';
import type { UiFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const UiNode: CustomNodeFC = () => {
  const formData = useNodeFormData<UiFormData>();
  const { uiComponents = [] } = useFlowContext();

  const component = uiComponents.find(e => {
    return e.componentId === formData.componentId;
  });

  return (
    <NodeWrapper
      tools={{
        editForm: {
          Component: Form,
          title: 'Edit Ui node',
          width: UiNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={component?.componentName}
        desc={formData.text}
      />
    </NodeWrapper>
  );
}

export default UiNode;

UiNode.Form = Form;
UiNode.modalWdith = 400;
UiNode.Icon = KubernetesOutlined;