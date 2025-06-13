import type { FlowSaveResult } from '../../types';
import type { TriggerModalProps } from '@/components/TriggerModal/types';

export type Conditions = Array<{
  condition: string;
}>;

export type FormDataType = {
  type: 'step' | 'branch';
  name: string;
  text: string;
  description: string;
  conditions: Conditions;
}

export type EditStepCanvasProps = {
  title: string;
  onSave?: (result: FlowSaveResult) => void;
} & Partial<FlowSaveResult>;

export type EditStepCanvasModalProps = Pick<
  TriggerModalProps,
  'trigger' | 'modal'
> & EditStepCanvasProps;