import { useMemo } from 'react';
import { FunctionOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import NodeDesc from '../../components/NodeDesc';
import { useFlowContext, useNodeFormData } from '../../hooks';
import type { ActionFormData } from './types';
import type { CustomNodeFC } from '../types';
import actionIcon from '../../icons/action-icon.svg';
import Form from './form';

const ActionNode: CustomNodeFC = () => {
  const { t } = useLang();
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
          title: t('flowCanvas.editActionNode'),
          width: ActionNode.modalWdith
        }
      }}
    >
      <NodeDesc
        title={action?.name || actionType}
        desc={formData?.text || action?.description}
        titleIcon={<img src={actionIcon} />}
      />
    </NodeWrapper>
  );
}

export default ActionNode;

ActionNode.Form = Form;
ActionNode.modalWdith = 560;
ActionNode.Icon = FunctionOutlined;