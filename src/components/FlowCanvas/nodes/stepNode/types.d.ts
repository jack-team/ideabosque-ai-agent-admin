import type { OptionType } from '../../types';

export type StepNodeFormData = {
  name: string;
  description: string;
  branch?: OptionType[];
}