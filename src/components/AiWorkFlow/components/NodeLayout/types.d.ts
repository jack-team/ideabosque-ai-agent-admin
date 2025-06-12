import type { Position } from '@xyflow/react';
import type { NodeComponent } from '../../types';
import type { ResultType } from '../SelectNodesDrawer/types';

export type DataType = {
  connectionEnable?: boolean;
  connectionTypes?: string[];
  values: ResultType;
}

export type NodeProps = Parameters<NodeComponent<DataType>>[0];

export type RenderHandle<D = any> = (formData: D) => ReactElement;