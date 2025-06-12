import type { FC } from 'react';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { columns } from './configs';

type SettingFormProps = {
  formData?: Record<string, any>;
  onSave?: (formData: Record<string, any>) => void; 
}

const SettingForm: FC<SettingFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    props.onSave?.(values);
    closeModal();
  });

  return (
    <div style={{ padding: '24px 0 0 0' }}>
      <BetaSchemaForm
        form={form}
        layout="horizontal"
        columns={columns}
        submitter={false}
        initialValues={props.formData}
      />
    </div>
  );
}

export default SettingForm;
