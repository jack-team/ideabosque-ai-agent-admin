import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormItem,
  ProFormTextArea
} from '@ant-design/pro-components';
import { App, InputNumber } from 'antd';
import { useModalOkClick } from '@/components/TriggerModal';
import type { WizardGroupResultType } from '@/typings/wizardGroup';
import { insertUpdateWizardGroupApi } from '@/services/wizardGroup';
import { partId } from '@/env';

type CreateFormProps = {
  onSuccess?: (data: WizardGroupResultType) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      const result = await insertUpdateWizardGroupApi({
        ...values,
        updatedBy: partId
      });
      props.onSuccess?.(result.wizardGroup);
      message.success(`UI Block Group created successfully.`);
    } catch {
      message.error(`Failed to create UI Block Group.`);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
    >
      <ProFormText
        label="UI Block Group name"
        name="wizardGroupName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="UI Block Group description"
        name="wizardGroupDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormItem
        label="Weight"
        name="weight"
        rules={[
          {
            required: true
          }
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder='Please enter'
        />
      </ProFormItem>
    </ProForm>
  );
}

export default CreateForm;