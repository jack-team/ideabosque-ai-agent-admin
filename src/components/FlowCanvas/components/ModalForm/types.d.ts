import type { ReactElement } from 'react';
import { type FormInstance } from '@ant-design/pro-components';
import type { TriggerModalProps } from '@/components/TriggerModal/types';

type FormProps = {
  formData?: Record<string, any>;
  children?: (form: FormInstance) => ReactElement | null;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}

export type ModalFormProps = Omit<TriggerModalProps, 'children'> & FormProps;