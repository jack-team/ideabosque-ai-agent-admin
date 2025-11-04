import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { App } from 'antd';
import SpinBox from '@/components/SpinBox';
import { useWorkflowList } from '@/hooks/useFetchData';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { insertUpdateWorkflowApi } from '@/services/workflow';
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
      await insertUpdateWorkflowApi({
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
  const { data, loading } = useWorkflowList({
    flowSnippetUuid: formData?.flowSnippetUuid
  });

  const options = data?.map(item => {
    return {
      label: `${item.flowSnippetVersionUuid}(${item.flowName})`,
      value: item.flowSnippetVersionUuid
    }
  });

  return (
    <SpinBox loading={loading}>
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
          name="flowSnippetUuid"
        />
        <ProFormSelect
          label="Versions"
          name="flowSnippetVersionUuid"
          options={options}
          fieldProps={{
            loading: loading
          }}
          rules={[
            { required: true }
          ]}
        />
      </ProForm>
    </SpinBox>
  );
}

export default VersionForm;