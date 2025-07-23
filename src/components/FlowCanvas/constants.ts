import { MarkerType } from '@xyflow/react';
import type { Edge } from '@xyflow/react';

// 连接线的样式
export const ConnectLineStyle: Partial<Edge> = {
  type: 'step',
  style: {
    stroke: '#0143EC',
    strokeWidth: 2
  },
  markerEnd: {
    color: '#0143EC',
    type: MarkerType.ArrowClosed
  }
}

export const ConnectionTypes = {
  target: 'Target',
  source: 'Source'
}