import { useMemo } from 'react';
import { FunctionOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext, useNodeFormData } from '../../hooks';
import type { ActionFormData } from './types';
import type { CustomNodeFC } from '../types';
import Form from './form';

const ActionNode: CustomNodeFC = () => {
  const { actions = [] } = useFlowContext();
  const formData = useNodeFormData<ActionFormData>();
  const actionType = formData?.type;

  const action = useMemo(() => {
    return actions.find(e => actionType === e.name);
  }, [actions, actionType]);

  return (
    <NodeWrapper
      tools={{
        editForm: {
          Component: Form,
          title: 'Edit Action node',
          width: ActionNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={action?.name || actionType}
        desc={formData?.text}
      />
    </NodeWrapper>
  );
}

export default ActionNode;

ActionNode.Form = Form;
ActionNode.modalWdith = 560;
ActionNode.Icon = FunctionOutlined;