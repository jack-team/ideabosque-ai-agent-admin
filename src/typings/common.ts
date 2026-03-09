import { StatusEnum } from '@/constants/enum';

export type StatusType = `${StatusEnum}`;

export type ParameterType = {
  name: string;
  label: string;
  parameter: string;
  valueListFunct?: string;
}