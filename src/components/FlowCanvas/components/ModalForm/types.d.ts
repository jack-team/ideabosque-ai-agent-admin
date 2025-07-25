import type { ReactElement } from 'react';
import { type FormInstance } from '@ant-design/pro-components';
import type { TriggerModalProps } from '@/components/TriggerModal/types';

type FormProps = {
  children?: (form: FormInstance) => ReactElement;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}

export type ModalFormProps = Omit<TriggerModalProps, 'children'> & FormProps;