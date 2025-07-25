import { BetaSchemaForm } from '@ant-design/pro-components';
import type { TriggerModalProps } from '@/components/TriggerModal/types';

export type BetaSchemaFormProps = Parameters<typeof BetaSchemaForm>[0];

type AtomFormFormProps = {
  formData?: Record<string, any>;
  columns: BetaSchemaFormProps['columns'];
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}

export type AtomModalFormProps = Omit<
  TriggerModalProps, 'children' | 'modal' | 'trigger' | 'okText' | 'title'
> & AtomFormFormProps & {
  edit?: boolean;
  atomName: string;
  children: TriggerModalProps['trigger']
};