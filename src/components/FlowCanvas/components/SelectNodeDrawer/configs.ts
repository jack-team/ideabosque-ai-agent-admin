
import { KubernetesOutlined } from '@ant-design/icons';
import type { NodeConfigType } from './type';
import UiForm from '../../forms/uiForm';

export const nodeList: NodeConfigType[] = [
  {
    nodeType: 'ui-node',
    icon: KubernetesOutlined,
    title: 'UI',
    desc: 'The UI components within the AI assistant can be used as a data source to obtain data.',
    form: UiForm
  }
]