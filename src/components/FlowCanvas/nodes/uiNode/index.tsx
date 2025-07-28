import { KubernetesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import { useCanvasContext, useCacheHandle } from '../../hooks';
import type { UiFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
import styles from './styles.module.less';

const UiNode: CustomNodeFC<UiFormData> = (props) => {
  const { formData } = props.data;
  const { uiComponents = [] } = useCanvasContext();

  const component = uiComponents.find(e => {
    return e.componentId === formData.componentId;
  });

  useCacheHandle(() => component);

  return (
    <NodeWrapper
      nodeProps={props}
      tools={{
        editForm: {
          formData,
          width: UiNode.modalWdith,
          title: 'Edit Ui node',
          Component: Form
        }
      }}
    >
      <div className={styles.node}>
        <div className={styles.component}>
          {component?.componentName}
        </div>
        <div className={styles.description}>
          {formData.description}
        </div>
      </div>
    </NodeWrapper>
  );
}

export default UiNode;


UiNode.Form = Form;
UiNode.modalWdith = 450;
UiNode.Icon = KubernetesOutlined;