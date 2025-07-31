import { useContext } from 'react';
import { useNodes, useNodeId, useNodesData } from '@xyflow/react';
import { useInstance } from '@/hooks/useInstance';
import type { NormalNodeType } from './types';
import { FlowContext, CanvasContext } from './context';
import type { FlowInstance, CanvasInstance } from './types';
import type { StepNodeFormData } from './nodes/stepNode/types';

// 获取 flow 的实例
export const useFlowInstance = () => {
  return useInstance<FlowInstance>({
    getData: () => null
  });
}

// 获取 canvas 的实例
export const useCanvasInctance = () => {
  return useInstance<CanvasInstance>({
    getData: () => null
  });
}

// 获取 Flow的上下文
export const useFlowContext = () => {
  return useContext(FlowContext);
}

// 获取 canvas 内部上下文
export const useCanvasContext = () => {
  return useContext(CanvasContext);
}

// 获取步骤Node详情
export const useStepDetail = () => {
  const { detailId: nodeId } = useFlowContext();
  const nodes = useNodes<NormalNodeType<StepNodeFormData>>();
  return nodes.find(n => n.id === nodeId);
}

// 获取步骤Node 中的 data 数据
export const useStepData = () => {
  const node = useStepDetail();
  return node?.data;
}

export function useNodeFormData<T extends {} = {} >() {
  const nodeId = useNodeId();
  const result = useNodesData<NormalNodeType<T>>(nodeId!);
  return result?.data?.formData;
}