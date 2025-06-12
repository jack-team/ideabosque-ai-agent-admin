import type { DynamicFormResult } from '../DynamicForm/types';
import type { FlowSaveResult } from '../../types';
import { nodeTypes } from '../../config';

export type ResultType = DynamicFormResult & {
  nodeType: keyof typeof nodeTypes;
  stepRealData?: FlowSaveResult; 
}