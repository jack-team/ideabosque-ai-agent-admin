import type { FlowSaveResult } from '@/components/AiWorkFlow/types';

export type ConditionType = {
  condition: string;
  nextStep?: string;
}

export type ProcessNodeDataResult = {
  id: string;
  type: ResultType['nodeType'];
  detail?: FlowSaveResult;
  nextStep?: string;
  conditions?: Array<ConditionType>;
  formData?: Record<string, any>;
}

export type DetailRefs = {
  getData: () => {
    flowRelationship: FlowSaveResult;
    flowContext: ProcessNodeDataResult[];
  };
}