import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormItem,
  ProFormTextArea
} from '@ant-design/pro-components';
import { App, InputNumber } from 'antd';
import { useLang } from '@/hooks/useLang';
import { useModalOkClick } from '@/components/TriggerModal';
import type { WizardGroupResultType } from '@/typings/wizardGroup';
import { insertUpdateWizardGroupApi } from '@/services/wizardGroup';
import { getPartId } from '@/env';

type CreateFormProps = {
  onSuccess?: (data: WizardGroupResultType) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const { t } = useLang();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      const result = await insertUpdateWizardGroupApi({
        ...values,
        updatedBy: getPartId()
      });
      props.onSuccess?.(result.wizardGroup);
      message.success(t('common.Saved successfully'));
    } catch {
      message.error(t('common.Failed to save, please contact the administrator'));
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
    >
      <ProFormText
        label={t('uiBlockGroup.UI Block Group name')}
        name="wizardGroupName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label={t('uiBlockGroup.UI Block Group description')}
        name="wizardGroupDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormItem
        label={t('uiBlockGroup.Weight')}
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