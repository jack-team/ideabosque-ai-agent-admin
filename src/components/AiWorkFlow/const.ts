import { MarkerType } from '@xyflow/react';
import type { Edge } from '@xyflow/react';

// 连接线的样式
export const CONNECT_LINE_STYLE: Partial<Edge> = {
  style: {
    stroke: '#0143EC',
    strokeWidth: 2
  },
  markerEnd: {
    color: '#0143EC',
    type: MarkerType.ArrowClosed
  }
}