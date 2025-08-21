import type { FC } from 'react';
import { App } from 'antd';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect
} from '@ant-design/pro-components';
import { useAgentOptions } from '@/hooks/useFetchData';
import { formDataTransfromParams, recordToFromData } from './helper';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { insertUpdateCoordinationApi } from '@/services/contactProfiles';

type EditFromProps = {
  formData?: Record<string, any>;
  onSuccess?: () => void;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();
  const agents = useAgentOptions();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    try {
      const params = formDataTransfromParams(values, agents.options);
      await insertUpdateCoordinationApi(params);
      message.success('Coordination created successfully.');
      closeModal();
      props.onSuccess?.();
    } catch (err) {
      message.error('Failed to create Coordination.');
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
      initialValues={recordToFromData(formData)}
    >
      <ProFormText name="coordinationUuid" hidden />
      <ProFormText
        required={false}
        label="Coordination Name"
        name="coordinationName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        required={false}
        label="Coordination Description"
        name="coordinationDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="Connected agents"
        name="agents"
        mode="multiple"
        options={agents.options}
        fieldProps={{
          maxTagCount: 1,
          loading: agents.loading
        }}
      />
    </ProForm>
  );
}

export default EditFrom;