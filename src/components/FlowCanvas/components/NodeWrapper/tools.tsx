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
  const { nodeId, Form } = props;
  const { setNodes } = useReactFlow();

  const handleDeleteNode = useMemoizedFn(() => {
    setNodes(ns => ns.filter(n => n.id !== nodeId));
  });

  return (
    <Space>
      <div
        className={styles.tool_item}
        onClick={handleDeleteNode}
      >
        <DeleteOutlined />
      </div>
      <ModalForm
        destroyOnHidden
        title={props.editFormTitle}
        formData={props.editFormData}
        okText="Save"
        trigger={
          <div className={styles.tool_item}>
            <EditFilled />
          </div>
        }
        onSubmit={async () => { }}
        children={form => Form ? <Form form={form} /> : null}
      />
      <div className={styles.tool_item}>
        <SettingOutlined />
      </div>
      <div className={styles.tool_item}>
        <FullscreenOutlined />
      </div>
    </Space>
  );
};

export default Tools;
