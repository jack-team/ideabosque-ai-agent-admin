import { useRef, useContext } from 'react';
import { FlowCanvasContext } from './context';
import type { FlowInstance } from './types';

export const useFlow = () => {
  const ref = useRef<FlowInstance>({
    getData: () => null
  });
  return [ref.current];
}

export const useCanvasContext = () => {
  return useContext(FlowCanvasContext);
}