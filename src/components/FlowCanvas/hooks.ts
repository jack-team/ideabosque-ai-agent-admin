import { useRef } from 'react';
import type { FlowInstance } from './types';

export const useFlow = () => {
  const ref = useRef<FlowInstance>({
    getData: () => null
  });
  return [ref.current];
}