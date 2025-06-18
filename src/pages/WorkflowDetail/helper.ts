import type { Edge } from '@xyflow/react';
import type { NodeType } from '@/components/AiWorkFlow/types';
import type { ProcessNodeDataResult, ConditionType } from './types';
import { transformInputFormData } from '@/components/AiWorkFlow/components/DynamicForm/helper';

// 处理 node 和 edges 的关系
export const processNodeData = (node: NodeType, edges: Edge[], parent?: ProcessNodeDataResult) => {
  const nodeId = node.id;
  const values = node.data.values;
  const formData = transformInputFormData(values.formData);
  const connects = edges.filter(edge => edge.source === nodeId);
  const { conditions = [], ...rest } = formData;

  const result: ProcessNodeDataResult = {
    id: nodeId,
    type: values.nodeType
  }

  if (values.stepRealData) {
    result.detail = values.stepRealData;
  }

  if (conditions.length) {
    result.conditions = (conditions as ConditionType[]).map(item => {
      let nextStep = connects.find(e => e.sourceHandle === item.condition)?.target;
      if (!nextStep && parent?.conditions) {
        nextStep = parent.conditions.find(e => e.condition === item.condition)?.nextStep;
      }
      return { ...item, nextStep };
    });
  } else {
    result.formData = rest;
    result.nextStep = connects[0]?.target || parent?.nextStep;
  }

  return result;
}