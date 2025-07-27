import { KubernetesOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import type { UiFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';
import styles from './styles.module.less';


const UiNode: CustomNodeFC<UiFormData> = (props) => {
  const { formData } = props.data;

  return (
    <NodeWrapper
      nodeProps={props}
      tools={{
        editForm: {
          formData,
          width: 400,
          title: 'Edit Ui node',
          Component: Form
        }
      }}
    >
      <div>{formData.description}</div>
    </NodeWrapper>
  );
}

export default UiNode;

UiNode.Form = Form;
UiNode.Icon = KubernetesOutlined;