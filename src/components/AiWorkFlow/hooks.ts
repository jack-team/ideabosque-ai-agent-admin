import { useContext } from 'react';
import { AiWorkFlowContext } from './context';

export const useAiWorkFlowContext = () => {
  return useContext(AiWorkFlowContext);
}