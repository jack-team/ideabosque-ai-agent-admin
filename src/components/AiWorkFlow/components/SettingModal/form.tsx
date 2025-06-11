import type { FC } from 'react';
import { BetaSchemaForm, type FormInstance } from '@ant-design/pro-components';
import { columns } from './configs';

type SettingFormProps = {
  formData?: Record<string, any>;
  form?: FormInstance;
}

const SettingForm: FC<SettingFormProps> = (props) => {
  return (
    <div style={{ padding: '24px 0 0 0' }}>
      <BetaSchemaForm
        form={props.form}
        layout="horizontal"
        columns={columns}
        submitter={false}
        initialValues={props.formData}
      />
    </div>
  );
}

export default SettingForm;
