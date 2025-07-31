import {
  EditFilled,
  DeleteOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import type { FC, ReactElement } from "react";
import { useReactFlow } from '@xyflow/react';
import { useCanvasContext, useFlowContext, useNodeFormData } from '../../hooks';
import ModalForm from "../ModalForm";
import type { ToolsProps } from './types';
import styles from "./styles.module.less";

const Tools: FC<ToolsProps> = (props) => {
  const { nodeId, tools } = props;
  const { editForm } = tools;
  const { top } = useCanvasContext();
  const { openDetail } = useFlowContext();
  const { setNodes, updateNodeData } = useReactFlow();
  const formData = useNodeFormData();

  const handleDeleteNode = useMemoizedFn(() => {
    setNodes(ns => ns.filter(n => n.id !== nodeId));
  });

  const onSaveNodeData = useMemoizedFn(
    async (formData: Record<string, any>) => {
      updateNodeData(nodeId, { formData })
    }
  );

  const openCanvasDetail = useMemoizedFn(() => {
    openDetail(nodeId);
  });

  const renderEditForm = (trigger: ReactElement<any>) => {
    if (!editForm) {
      return null;
    }
    return (
      <ModalForm
        centered
        okText="Save"
        destroyOnHidden
        trigger={trigger}
        formData={formData}
        width={editForm.width}
        onSubmit={onSaveNodeData}
        title={editForm.title || 'Edit Node'}
        children={form => <editForm.Component form={form} />}
      />
    );
  }

  return (
    <Space>
      {top && (
        <div
          onClick={openCanvasDetail}
          className={styles.tool_item}
        >
          <FullscreenOutlined />
        </div>
      )}
      {renderEditForm(
        <div className={styles.tool_item}>
          <EditFilled />
        </div>
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
