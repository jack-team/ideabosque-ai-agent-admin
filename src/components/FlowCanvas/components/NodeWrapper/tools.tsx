import { Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import type { FC, ReactElement } from "react";
import { DeleteIcon, EditIcon, MaximizeIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { useReactFlow } from '@xyflow/react';
import { useCanvasContext, useFlowContext, useNodeFormData } from '../../hooks';
import ModalForm from "../ModalForm";
import type { ToolsProps } from './types';

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
    <Space size={16}>
      {top && (
        <IconButton
          icon={MaximizeIcon}
          onClick={openCanvasDetail}
        />
      )}
      {renderEditForm(
        <IconButton icon={EditIcon} />
      )}
      <IconButton
        icon={DeleteIcon}
        onClick={handleDeleteNode}
      />
    </Space>
  );
};

export default Tools;
