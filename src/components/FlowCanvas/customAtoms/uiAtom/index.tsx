import type { FC } from 'react';
import { KubernetesOutlined } from '@ant-design/icons';
import AtomNode from '../../components/AtomNode';
import UiAtomForm from './form';

const uiAtom: FC = () => {
  return (
    <UiAtomForm>
      <AtomNode
        role="ui"
        title="UI"
        icon={<KubernetesOutlined />}
        desc="The UI components within the AI assistant can be used as a data source to obtain data."
      />
    </UiAtomForm>
  );
}

export default uiAtom;