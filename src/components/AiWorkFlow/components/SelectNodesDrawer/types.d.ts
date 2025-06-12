import type { DynamicFormResult } from '../DynamicForm/types';
import type { FlowSaveResult } from '../../types';

export type ResultType = DynamicFormResult & {
  nodeType: string;
  stepRealData?: FlowSaveResult; 
}