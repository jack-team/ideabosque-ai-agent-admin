import * as uuid from 'uuid';
import { useContext } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNodes, useNodeId, useNodesData, useReactFlow } from '@xyflow/react';
import { useInstance } from '@/hooks/useInstance';
import { DefaultTargetId } from './constants';
import { assembleData } from './helper';
import { FlowContext, CanvasContext } from './context';
import type { StepNodeFormData } from './nodes/stepNode/types';
import type { SelectResult } from "./components/SelectNodeDrawer/types";
import type { FlowInstance, CanvasInstance, NormalNodeType, OptionType } from './types';

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

export const useAddNode = () => {
  const nodeId = useNodeId();
  const { openDetail } = useFlowContext();
  const { addEdges, addNodes, getNodes } = useReactFlow();

  // 获取下一个坐标
  const getPosition = useMemoizedFn(() => {
    const nodes = getNodes();
    const node = nodes.find(e => e.id === nodeId);

    let x = node?.position.x || 0;
    const y = node?.position.y || 0;
    x = x + (node?.measured?.width || 0) + 80;

    return { x, y };
  });

  const addNodeHandle = useMemoizedFn((input: SelectResult) => {
    const newId = uuid.v4();
    const tgId = input.triggerId;
    const nodeType = input.nodeType;

    // 添加节点
    addNodes({
      id: newId,
      data: input,
      type: nodeType,
      position: getPosition()
    });

    // 自动连线
    if (nodeId) {
      addEdges({
        id: uuid.v4(),
        // 连接的起点 id
        source: nodeId,
        // 连接的终点 id
        target: newId,
        sourceHandle: tgId,
        targetHandle: DefaultTargetId
      });
    }

    if (nodeType === 'step') {
      openDetail(newId);
    }
  })

  return [addNodeHandle];
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

// 获取单个 node 下面的 node
export function useNodeData<T extends {} = {}>() {
  const nodeId = useNodeId();
  const result = useNodesData<NormalNodeType<T>>(nodeId!);
  return result?.data;
}

// 获取单个 node 下面的 formData
export function useNodeFormData<T extends {} = {}>() {
  const data = useNodeData<T>();
  return data?.formData;
}

// 根据 details 获取node 下面的分支
export function useNodeBranchForDetails() {
  const data = useNodeData();
  const details = data?.details;

  if (!details) {
    return [];
  }

  const set = new Set<string>();
  let result = assembleData(details);
  result = result.filter(v => !v.nextStep);

  result.forEach(item => {
    const conditions = item.conditions;
    if (!conditions?.length) {
      set.add('off topic');
    } else {
      for (const con of conditions) {
        set.add(con.condition!);
      }
    }
  });

  return [...set].map<OptionType>(val => (
    {
      label: val,
      value: val
    }
  ));
}