import { type FC, useMemo } from 'react';
import { App } from 'antd';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { getPartId } from '@/env';
import SpinBox from '@/components/SpinBox';
import { StatusEnum } from '@/constants/enum';
import type { WorkflowDataType } from '@/typings/workflow';
import { useModalOkClick } from '@/components/TriggerModal';
import { workflowListApi, insertUpdateWorkflowApi } from '@/services/workflow';
import { formatDate } from '@/utils';
import { useLang } from '@/hooks/useLang';

type EditFormProps = {
  workflow: WorkflowDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { workflow } = props;
  const { t } = useLang();
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  const {
    loading,
    data: workflows
  } = useRequest(async (params) => {
    return workflowListApi({
      ...params,
      flowSnippetUuid: workflow.flowSnippetUuid
    });
  });

  const options = useMemo(() => {
    return (workflows?.data || [workflow]).map(item => {
      return {
        ...item,
        createdAt: formatDate(item.createdAt)
      }
    });
  }, [workflows, workflow]);

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateWorkflowApi({
        ...values,
        updatedBy: getPartId(),
        status: StatusEnum.Active
      });
      props.onSaveSuccess?.();
      message.success(t('common.Version successfully applied'));
    } catch (err) {
      message.error(t('common.Failed to apply for the version, please contact the administrator'));
    }
  });

  return (
    <SpinBox loading={loading}>
      <ProForm
        form={form}
        initialValues={workflow}
        submitter={false}
        style={{ padding: '0 6px' }}
      >
        <ProFormText
          label={t('workflow.workflowName')}
          name="flowName"
          rules={[{ required: true }]}
        />
        <ProFormText
          disabled
          label={t('workflow.WorkflowUuid')}
          name="flowSnippetUuid"
        />
        <ProFormSelect
          label={t('common.version')}
          name="flowSnippetVersionUuid"
          options={options}
          fieldProps={{
            fieldNames: {
              label: 'createdAt',
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