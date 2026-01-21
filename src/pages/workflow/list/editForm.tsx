import { type FC } from 'react';
import { App } from 'antd';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { partId } from '@/env';
import SpinBox from '@/components/SpinBox';
import { StatusEnum } from '@/constants/enum';
import type { WorkflowDataType } from '@/typings/workflow';
import { useModalOkClick } from '@/components/TriggerModal';
import { workflowListApi, insertUpdateWorkflowApi } from '@/services/workflow';

type EditFormProps = {
  workflow: WorkflowDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { workflow } = props;
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  const {
    loading,
    data: workflows
  } = useRequest(async (params) => {
    return workflowListApi({
      ...params,
      statuses: [StatusEnum.Active]
    });
  });

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateWorkflowApi({
        ...values,
        updatedBy: partId,
        status: StatusEnum.Active
      });
      props.onSaveSuccess?.();
      message.success('The version has been applied successfully.');
    } catch (err) {
      message.error('The version application failed.');
    }
  });

  return (
    <SpinBox loading={loading}>
      <ProForm
        form={form}
        initialValues={workflow}
        submitter={false}
        style={{ padding: '0 6px'}}
      >
        <ProFormText
          label="Workflow name"
          name="flowName"
          rules={[{ required: true }]}
        />
        <ProFormText
          disabled
          label="Workflow UUID"
          name="flowSnippetUuid"
        />
        <ProFormSelect
          label="Version"
          name="flowSnippetVersionUuid"
          options={workflows?.data || [workflow]}
          fieldProps={{
            fieldNames: {
              label: 'flowName',
              value: 'flowSnippetVersionUuid'
            }
          }}
          rules={[
            { required: true }
          ]}
        />
      </ProForm>
    </SpinBox>
  );
}

export default EditForm;