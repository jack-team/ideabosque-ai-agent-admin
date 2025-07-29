import { useMemo } from 'react';
import { FunctionOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useCanvasContext } from '../../hooks';
import type { ActionFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const ActionNode: CustomNodeFC<ActionFormData> = (props) => {
  const { formData } = props.data;
  const actionType = formData.type;
  const { actions = [] } = useCanvasContext();

  const action = useMemo(() => {
    return actions.find(e => actionType === e.name);
  }, [actions, actionType]);

  return (
    <NodeWrapper
      tools={{
        editForm: {
          formData,
          Component: Form,
          title: 'Edit Action node',
          width: ActionNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={action?.name}
        desc={formData.text}
      />
    </NodeWrapper>
  );
}

export default ActionNode;

ActionNode.Form = Form;
ActionNode.modalWdith = 400;
ActionNode.Icon = FunctionOutlined;