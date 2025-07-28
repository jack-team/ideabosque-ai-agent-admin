import { useRef, useContext } from 'react';
import { useNodeConnections, useNodeId } from '@xyflow/react';
import { FlowCanvasContext } from './context';
import { useObjNoEqualEffect } from '@/hooks/useObjNoEqualEffect';
import type { FlowInstance, NodeCollect } from './types';

export const useFlow = () => {
  const ref = useRef<FlowInstance>({
    getData: () => null
  });
  return [ref.current];
}

export const useCanvasContext = () => {
  return useContext(FlowCanvasContext);
}

export const usePrevNodesData = () => {
  const conns = useNodeConnections();
  console.log(conns)
  const { cacheNodeDatas } = useCanvasContext();
  return conns.map(e => cacheNodeDatas[e.source]).filter(Boolean);
}

type GetDataType = () => NodeCollect | undefined;

export const useCacheHandle = (getData: GetDataType) => {
  const id = useNodeId();
  const data = getData();
  const { saveCacheNodeDatas } = useCanvasContext();
  
  useObjNoEqualEffect(() => {
    if (data) saveCacheNodeDatas(id!, { data });
  }, [data]);
}
