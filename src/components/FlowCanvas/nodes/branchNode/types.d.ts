import type { OptionType } from '../../types';

export type BranchFormData = {
  name: string;
  text: string;
  branch?: OptionType[];
}