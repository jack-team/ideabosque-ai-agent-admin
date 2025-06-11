import type { Position } from '@xyflow/react';
import type { ResultType } from '../SelectNodesDrawer/types';

export type DataType = {
  isFirstNode?: boolean;
  isConnectable?: boolean;
  values: ResultType;
}