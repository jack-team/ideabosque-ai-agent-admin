import type { FC } from 'react';
import classNames from 'classnames';
import { Space, Dropdown } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { EditFilled, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DynamicFormProps, DynamicFormResult } from '../DynamicForm/types';
import { TriggerModal } from '@/components';
import DynamicForm from '../DynamicForm';
import { useAiWorkFlowContext } from '../../hooks';
import type { DataType } from '../NodeLayout/types';
import SettingModal from '../SettingModal';

import styles from './styles.module.less';

type CustomNodeToolbarProps = DynamicFormProps & {
  id: string;
  data: DataType;
}

const CustomNodeToolbar: FC<CustomNodeToolbarProps> = (props) => {
  const { data } = props;
  const { updateNodeData, deleteNode } = useAiWorkFlowContext();
  const [dropdownShow, setDropdownShow] = useSafeState(false);
  const [settingShow, setSettingShow] = useSafeState(false);

  const onUpdate = useMemoizedFn(async (result: DynamicFormResult) => {
    data.values = Object.assign(data.values, result);
    updateNodeData(props.id, data);
  });

  const onSettingSave = useMemoizedFn(async (values: Record<string, any>) => {
    updateNodeData(props.id, Object.assign(data, values));
  });

  const onDelete = useMemoizedFn(() => deleteNode(props.id));

  const containerCls = classNames(
    'ai-node-tool-bar',
    styles.tool_bar_container,
    dropdownShow && 'tool-bar-force-show'
  );

  return (
    <div className={containerCls}>
      <Space size={8}>
        <div
          onClick={onDelete}
          className={styles.tool_bar_action}
        >
          <DeleteOutlined />
        </div>
        <TriggerModal
          title="Edit"
          okText="Save"
          trigger={
            <div className={styles.tool_bar_action}>
              <EditFilled />
            </div>
          }
        >
          <DynamicForm
            {...props}
            onSubmit={onUpdate}
          />
        </TriggerModal>
        <Dropdown
          arrow
          open={dropdownShow}
          openClassName={styles.open_state}
          onOpenChange={setDropdownShow}
          menu={{
            items: [
              {
                key: 'setting',
                label: 'Settings',
                icon: <SettingOutlined />,
                onClick: () => setSettingShow(true)
              }
            ]
          }}>
          <div className={styles.tool_bar_action}>
            <EllipsisOutlined />
          </div>
        </Dropdown>
      </Space>
      <SettingModal
        open={settingShow}
        onSave={onSettingSave}
        formData={props.data}
        onOpenChange={setSettingShow}
      />
    </div>
  );
}

export default CustomNodeToolbar;