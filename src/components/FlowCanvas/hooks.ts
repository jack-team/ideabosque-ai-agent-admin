import { useRef, useContext } from 'react';
import { useNodes } from '@xyflow/react';
import { FlowCanvasContext, FlowCanvasInnerContext } from './context';
import type { FlowInstance, CanvasInstance } from './types';
import type { NormalNodeType } from './types';
import type { StepNodeFormData } from './nodes/stepNode/types';

export const useFlow = () => {
  const ref = useRef<FlowInstance>({
    getData: () => null
  });
  return [ref.current];
}

export const useCanvas = () => {
  const ref = useRef<CanvasInstance>({
    getData: () => null
  });
  return [ref.current];
}

export const useCanvasContext = () => {
  return useContext(FlowCanvasContext);
}

export const useCanvasInnerContext = () => {
  return useContext(FlowCanvasInnerContext);
}

export const useCanvasDetail = () => {
  const {
    detailId,
    openDetail,
    closeDetail
  } = useCanvasContext();

  return {
    detailId,
    openDetail,
    closeDetail
  }
}

export const useDetailNode = () => {
  const { detailId } = useCanvasDetail();
  const nodes = useNodes<NormalNodeType<StepNodeFormData>>();
  return nodes.find(n => n.id === detailId);
}

export const useDetailData = () => {
  const node = useDetailNode();
  return node?.data;
}