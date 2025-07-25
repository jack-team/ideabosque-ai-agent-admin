import type { ReactElement } from 'react';

export type AtomFormProps = {
  edit?: boolean;
  children: ReactElement<any>;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}
