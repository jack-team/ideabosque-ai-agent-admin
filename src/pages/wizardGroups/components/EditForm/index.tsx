import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { App } from 'antd';
import { type FC } from 'react';
import { formDataToParams } from './helper';
import { insertUpdateWizardGroupApi } from '@/services/wizard';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';

type EditFromProps = {
  onSuccess?: () => void;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    const params = formDataToParams(values);
    try {
      await insertUpdateWizardGroupApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`UI Block Group created successfully.`);
    } catch {
      message.error(`Failed to create UI Block Group.`);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="wizardUuid"
      />
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
      <ProFormText
        label="Weight"
        name="weight"
        fieldProps={{
          type: 'number'
        }}
        rules={[
          { 
            required: true
          }
        ]}
      />
    </ProForm>
  );
}

export default EditFrom;