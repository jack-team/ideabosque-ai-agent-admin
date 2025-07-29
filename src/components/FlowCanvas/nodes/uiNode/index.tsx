import { KubernetesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useCanvasContext, useCacheHandle } from '../../hooks';
import type { UiFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const UiNode: CustomNodeFC<UiFormData> = (props) => {
  const { formData } = props.data;
  const { uiComponents = [] } = useCanvasContext();

  const component = uiComponents.find(e => {
    return e.componentId === formData.componentId;
  });

  useCacheHandle(() => component);

  return (
    <NodeWrapper
      tools={{
        editForm: {
          formData,
          Component: Form,
          title: 'Edit Ui node',
          width: UiNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={component?.componentName}
        desc={formData.description}
      />
    </NodeWrapper>
  );
}

export default UiNode;


UiNode.Form = Form;
UiNode.modalWdith = 450;
UiNode.Icon = KubernetesOutlined;