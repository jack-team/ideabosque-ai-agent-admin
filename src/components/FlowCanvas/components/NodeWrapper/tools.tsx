import type { FC } from "react";
import { Space } from "antd";
import {
  EditFilled,
  SettingOutlined,
  DeleteOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { useMemoizedFn } from 'ahooks';
import { useReactFlow } from '@xyflow/react';
import ModalForm from "../ModalForm";
import type { ToolsProps } from './types';
import styles from "./styles.module.less";

const Tools: FC<ToolsProps> = (props) => {
  const { nodeId, tools } = props;

  const { editForm } = tools;

  const { setNodes } = useReactFlow();

  const handleDeleteNode = useMemoizedFn(() => {
    setNodes(ns => ns.filter(n => n.id !== nodeId));
  });

  return (
    <Space>
      <div className={styles.tool_item}>
        <FullscreenOutlined />
      </div>
      {!!editForm && (
        <ModalForm
          okText="Save"
          destroyOnHidden
          width={editForm.width}
          formData={editForm.formData}
          title={editForm.title || 'Edit Node'}
          trigger={
            <div className={styles.tool_item}>
              <EditFilled />
            </div>
          }
          onSubmit={async () => { }}
          children={form => <editForm.Component form={form} />}
        />
      )}
      <div
        onClick={handleDeleteNode}
        className={styles.tool_item}
      >
        <DeleteOutlined />
      </div>
    </Space>
  );
};

export default Tools;
