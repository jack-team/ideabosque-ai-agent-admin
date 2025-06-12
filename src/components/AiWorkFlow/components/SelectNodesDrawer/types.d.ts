import type { DynamicFormResult } from '../DynamicForm/types';
import type { FlowSaveResult } from '../../types';
import { nodeTypes } from '../../config';

export type ResultType = DynamicFormResult & {
  nodeType: keyof typeof nodeTypes;
  // 步骤画布存储的信息
  stepRealData?: FlowSaveResult;
  // 自动打开
  autoOpenStepCanvas?: boolean;
}