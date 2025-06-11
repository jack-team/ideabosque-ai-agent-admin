import type { Position } from '@xyflow/react';
import type { ResultType } from '../../components/SelectNodesDrawer/types';

export type DataType = {
  isFirstNode?: boolean;
  isConnectable?: boolean;
  values: ResultType;
}

export type Conditions = Array<{
  label: string;
  condition: string;
}>;