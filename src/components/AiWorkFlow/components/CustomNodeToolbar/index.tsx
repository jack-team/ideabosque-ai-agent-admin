import type { FC } from 'react';
import { Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { NodeToolbar } from '@xyflow/react';
import { EditFilled } from '@ant-design/icons';
import { TriggerModal } from '@/components';
import DynamicForm from '../DynamicForm';
import { useAiWorkFlowContext } from '../../hooks';
import type { DataType } from '../../nodes/UiNode/types';
import type { DynamicFormProps, DynamicFormResult } from '../DynamicForm/types';

type CustomNodeToolbarProps = DynamicFormProps & {
  id: string;
  data: DataType;
}

const CustomNodeToolbar: FC<CustomNodeToolbarProps> = (props) => {
  const { data } = props;
  const { updateNodeData } = useAiWorkFlowContext();

  const onUpdate = useMemoizedFn(async (result: DynamicFormResult) => {
    data.values = Object.assign(data.values, result);
    updateNodeData(props.id, data);
  });

  return (
    <NodeToolbar>
      <TriggerModal
        title="Edit"
        okText="Save"
        trigger={
          <Button className="shopify">
            <EditFilled />
          </Button>
        }
      >
        <DynamicForm
          {...props}
          onSubmit={onUpdate}
        />
      </TriggerModal>
    </NodeToolbar>
  );
}

export default CustomNodeToolbar;