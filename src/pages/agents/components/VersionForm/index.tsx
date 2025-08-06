import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { App } from 'antd';

import { useAgentVersions } from '@/hooks/useFetchData';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { insertUpdateAgentApi } from '@/services/agent';
import { StatusEnum } from '@/constants/enum';

type VersionFormProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const VersionForm: FC<VersionFormProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateAgentApi({
        ...values,
        status: StatusEnum.Active,
        updatedBy: 'Admin'
      });
      closeModal();
      props.onSuccess?.();
      message.success('Agent created successfully.');
    } catch (err) {
      message.success('Failed to create Agent.');
    }
  });

  // 获取 agent 的版本
  const {
    options: versionOptions,
    loading: versionLoading
  } = useAgentVersions(formData?.agentUuid);

  return (
    <ProForm
      form={form}
      initialValues={formData}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="agentUuid"
      />
      <ProFormSelect
        label="Versions"
        name="agentVersionUuid"
        options={versionOptions}
        fieldProps={{
          loading: versionLoading
        }}
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default VersionForm;