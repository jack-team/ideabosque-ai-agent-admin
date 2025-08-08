import { type FC } from 'react';
import { App } from 'antd';
import {
  ProForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import SpinBox from '@/components/SpinBox';
import { StatusEnum } from '@/constants/enum';
import { insertUpdatePromptTemplateApi } from '@/services/workflow';
import { useWorkFlowTemplatesVersionOptions } from '@/hooks/useFetchData';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';

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
      await insertUpdatePromptTemplateApi({
        ...values,
        status: StatusEnum.Active,
        updatedBy: 'Admin'
      });
      closeModal();
      props.onSuccess?.();
      message.success('The version has been applied successfully.');
    } catch (err) {
      message.error('The version application failed.');
    }
  });

  // 获取 agent 的版本
  const {
    options: versionOptions,
    loading: versionLoading
  } = useWorkFlowTemplatesVersionOptions(formData?.promptUuid);

  return (

    <ProForm
      form={form}
      initialValues={formData}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <SpinBox loading={versionLoading}>
        <ProFormText
          hidden
          name="promptUuid"
        />
        <ProFormSelect
          label="Versions"
          name="promptVersionUuid"
          options={versionOptions}
          fieldProps={{
            loading: versionLoading
          }}
          rules={[
            { required: true }
          ]}
        />
      </SpinBox>
    </ProForm >
  );
}

export default VersionForm;