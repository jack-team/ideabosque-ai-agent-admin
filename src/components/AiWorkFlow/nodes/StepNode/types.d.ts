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