import type { OptionType } from '../../types';

export type StepNodeFormData = {
  name: string;
  text: string;
  branch?: OptionType[];
}