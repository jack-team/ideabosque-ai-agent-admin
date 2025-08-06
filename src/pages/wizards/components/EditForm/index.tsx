import { type FC, useEffect } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-components';
import { App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData, formDataToParams } from './helper';
import { insertUpdateWizardApi } from '@/services/wizard';
import { useElementOptions } from '@/hooks/useFetchData';
import { WizardTypesMap } from '@/constants/map';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();
  const elements = useElementOptions();

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
      await insertUpdateWizardApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`Wizard ${formData ? 'updated' : 'created'} successfully.`);
    } catch (err) {
      message.error(`Failed to ${formData ? 'update' : 'create'} Wizard.`);
    }
  });

  return (
    <ProForm
      form={form}
      layout="horizontal"
      submitter={false}
      labelCol={{
        flex: '170px'
      }}
      labelAlign='left'
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="wizardUuid"
      />
      <ProFormText
        label="Wizard Title"
        name="wizardTitle"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="Wizard Type"
        name="wizardType"
        valueEnum={WizardTypesMap}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Wizard Description"
        name="wizardDescription"
        fieldProps={{ rows: 8 }}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Priority"
        name="priority"
        fieldProps={{
          type: 'number'
        }}
        rules={[
          {
            required: true
          }
        ]}
      />
      <ProFormTextArea
        label="Form Schema"
        name="formSchema"
        fieldProps={{ rows: 8 }}
      />
      <ProFormSelect
        label="Elements"
        name="elementUuids"
        mode="multiple"
        options={elements.options}
        fieldProps={{
          maxTagCount: 1,
          loading: elements.loading
        }}
      />
    </ProForm>
  );
}

export default EditFrom;