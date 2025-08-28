import { type FC, useEffect } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { App } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData, formDataToParams } from './helper';
import { insertUpdateWizardGroupApi } from '@/services/wizard';
import { useWizardOptions } from '@/hooks/useFetchData';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  const wizards = useWizardOptions();

  const initFromData = useMemoizedFn(() => {
    form.setFieldsValue(recordToFormData(formData));
  });

  useEffect(() => {
    if (formData) {
      initFromData();
    }
  }, [formData]);

  useListenModalOk(async () => {
    const values = await form.validateFields();
    const params = formDataToParams(values);
    try {
      await insertUpdateWizardGroupApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`UI Block Group ${formData ? 'updated' : 'created'} successfully.`);
    } catch (err) {
      message.error(`Failed to ${formData ? 'update' : 'create'} UI Block Group.`);
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
      <ProFormSelect
        label="UI Blocks"
        name="wizardUuids"
        mode="multiple"
        options={wizards.options}
        fieldProps={{
          maxTagCount: 1,
          loading: wizards.loading
        }}
      />
    </ProForm>
  );
}

export default EditFrom;