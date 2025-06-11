import type { Position } from '@xyflow/react';

export type DataType = {
  isFirstNode?: boolean;
  isConnectable?: boolean;
  values: Record<string, any>;
}