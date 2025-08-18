import * as uuid from 'uuid';
import type { Edge } from '@xyflow/react';
import type {
  EdgeLinkType,
  GetDataResult,
  AssembleDataResult,
  NormalNodeType,
  OptionType,
  ConditionType
} from './types';

import {
  StartNodeId,
  DefaultSourceId,
  DefaultTargetId
} from './constants';

// 以起点为维度，获取边
const sourceToEdges = (edges: Edge[]) => {
  const maps: Map<string, Edge[]> = new Map();
  for (const edge of edges) {
    const s = edge.source;
    const arr = maps.get(s) || [];
    maps.set(s, [...arr, edge]);
  }
  return maps;
}

// 创建一个新的的边
const createNewEdge = (source: string, target = '') => ({
  id: uuid.v4(),
  source,
  target,
  sourceHandle: DefaultSourceId,
  targetHandle: DefaultTargetId
});

// 补全缺失的边
export const completionEdges = (edges: Edge[]) => {
  const newEdges: Edge[] = [];
  for (const edge of edges) {
    newEdges.push(edge);
    const next = edge.target;
    // 如果后续边不存在， 补齐后边
    if (!edges.find(e => e.source === next)) {
      newEdges.push(createNewEdge(next));
    }
  }
  return newEdges;
}

// 边排序，Start 在最前面
export function sortEdgesByFlow(edges: Edge[]) {
  edges = completionEdges(edges);

  // 找到起始边（从start节点出发的边）
  const startEdge = edges.find(e => {
    return e.source === StartNodeId;
  });

  // 如果没有找到起始边，返回原数组
  if (!startEdge) return edges;

  // 构建源到边的映射
  const maps = sourceToEdges(edges);

  // 按连接顺序排序
  const sortedEdges = [startEdge];
  let current = startEdge.target;

  const getEdges = (key: string) => {
    return maps.get(key) || [];
  }

  while (getEdges(current).length) {
    // 取第一个以当前目标为源的边
    const [next] = getEdges(current);
    sortedEdges.push(next);

    current = next.target;

    // 从映射中移除已添加的边
    const edges = getEdges(current).
      filter(edge => edge.id !== next.id);

    maps.set(current, edges);
  }

  // 添加剩余未连接的边（如果有的话）
  for (const edge of edges) {
    if (!sortedEdges.some(e => e.id === edge.id)) {
      sortedEdges.push(edge);
    }
  }

  return sortedEdges.filter(e => e.source !== StartNodeId);
}

// 把 edges 转换为链
export const transformEdagesToLinks = (edges: Edge[]) => {
  const result = [...sourceToEdges(edges)];
  return result.map(([id, branch]) => {
    const [edge] = branch;
    const next = edge.target;

    const result: EdgeLinkType = { id };
    let conditions: ConditionType[] = [];

    branch.forEach(item => {
      const nextStep = item.target;
      const condition = item.sourceHandle;
      // 默认分支
      if (condition === DefaultSourceId) {
        result.nextStep = nextStep;
      } else {
        conditions.push({ condition, nextStep });
      }
    });

    if (!conditions.length) {
      result.nextStep = next;
    } else {
      result.conditions = conditions;
    }

    return result;
  });
}

// 组装数据给到外部
export function assembleData(details: GetDataResult, conditions: ConditionType[] = []): AssembleDataResult[] {
  const cacheNodes = new Map<string, NormalNodeType>();
  const nodes = details.nodes || [];
  const edges = details.edges || [];

  for (const node of nodes) {
    cacheNodes.set(node.id, node);
  }

  const sortEdges = sortEdgesByFlow(edges);
  const links = transformEdagesToLinks(sortEdges);

  const findNode = (id: string) => {
    return cacheNodes.get(id);
  }

  return links.map(item => {
    const node = findNode(item.id);
    const data = node?.data;

    // 去掉 branch 字段
    const { branch, ...formData } = { ...data?.formData };

    const result: AssembleDataResult = {
      ...item,
      type: node?.type,
      formData,
    }

    // 获取分支
    if (branch?.length) {
      const arr = item.conditions || conditions;

      result.conditions = branch.map(b => {
        const val = b.value;
        const r = arr.find(e =>
          e.condition === val
        );

        return {
          label: b.label,
          condition: b.value,
          nextStep: r?.nextStep
        }
      });
    }

    if (data?.details) {
      result.details = assembleData(
        data?.details,
        result.conditions
      );
    }

    return result;
  });
}

export const getNodeBranchByDetails = (details: GetDataResult) => {
  const branch: OptionType[] = [];
  let result = assembleData(details);
  const items = result.filter(v => !v.nextStep);

  for (const item of items) {
    if (item.conditions?.length) {
      item.conditions.forEach(e => {
        if (!e.nextStep) {
          branch.push({
            label: e.label!,
            value: e.condition!
          })
        }
      });
    }
  }

  return branch;
}