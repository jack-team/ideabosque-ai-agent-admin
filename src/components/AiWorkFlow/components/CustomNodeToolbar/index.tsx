import type { FC } from 'react';
import classNames from 'classnames';
import { Space } from 'antd';
import { useMemoizedFn, useMount } from 'ahooks';
import { EditFilled, SettingOutlined, DeleteOutlined, FullscreenOutlined } from '@ant-design/icons';
import type { DynamicFormProps, DynamicFormResult } from '../DynamicForm/types';
import { useAiWorkFlowContext } from '../../hooks';
import type { DataType } from '../NodeLayout/types';
import type { FlowSaveResult } from '../../types';
import EditStepCanvasModal from '../EditStepCanvasModal';
import TriggerModal, { useModal } from '@/components/TriggerModal';
import SettingForm from '../SettingForm';
import DynamicForm from '../DynamicForm';

import styles from './styles.module.less';

type CustomNodeToolbarProps = DynamicFormProps & {
  id: string;
  data: DataType;
  editModalWidth?: any;
}

const CustomNodeToolbar: FC<CustomNodeToolbarProps> = (props) => {
  const { data } = props;
  const values = data.values;

  const { 
    nodeType,
    formData, 
    autoOpenStepCanvas = true 
  } = values;

  const {
    role,
    deleteNode,
    updateNodeData
  } = useAiWorkFlowContext();
  const [modal] = useModal();

  const onUpdateNodeData = useMemoizedFn(
    async (updated: Partial<DataType>) => {
      updateNodeData(props.id, Object.assign(data, updated));
    }
  );

  // 修改节点信息
  const onEditNode = useMemoizedFn(
    async (result: DynamicFormResult) => {
      data.values = Object.assign(data.values, result);
      onUpdateNodeData(data);
    }
  );

  // 保存设置
  const onSettingSave = useMemoizedFn(
    async (values: Record<string, any>) => {
      onUpdateNodeData(values);
    }
  );

  // 保存 step data
  const onUpdateStepData = useMemoizedFn(
    (result: FlowSaveResult) => {
      data.values.stepRealData = result;
      onUpdateNodeData(data);
    }
  );

  const onLaunchStepCanvas = useMemoizedFn(() => {
    const isParent = role === 'parent';
    const isSetp = nodeType === 'step';

    if (isParent && isSetp && autoOpenStepCanvas) {
      values.autoOpenStepCanvas = false;
      requestAnimationFrame(() => {
        modal.openModal();
        onUpdateNodeData(data);
      });
    }
  });

  const containerCls = classNames(
    'ai-node-tool-bar',
    styles.tool_bar_container
  );

  useMount(onLaunchStepCanvas);

  return (
    <div className={containerCls}>
      <Space size={12}>
        <div
          className={styles.tool_bar_action}
          onClick={() => deleteNode(props.id)}
        >
          <DeleteOutlined />
        </div>
        {role === 'parent' && (
          <EditStepCanvasModal
            {...values.stepRealData}
            modal={modal}
            title={formData.name?.value as string}
            onSave={onUpdateStepData}
            trigger={
              <div className={styles.tool_bar_action}>
                <FullscreenOutlined />
              </div>
            }
          />
        )}
        <TriggerModal
          title="Edit Node"
          okText="Save"
          width={props.editModalWidth}
          trigger={
            <div className={styles.tool_bar_action}>
              <EditFilled />
            </div>
          }
        >
          <DynamicForm
            {...props}
            onSubmit={onEditNode}
          />
        </TriggerModal>
        <TriggerModal
          title="Settings"
          okText="Save"
          trigger={
            <div className={styles.tool_bar_action}>
              <SettingOutlined />
            </div>
          }
        >
          <SettingForm
            formData={props.data}
            onSave={onSettingSave}
          />
        </TriggerModal>
      </Space>
    </div>
  );
}

export default CustomNodeToolbar;