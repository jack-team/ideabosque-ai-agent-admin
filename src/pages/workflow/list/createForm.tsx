import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { partId } from '@/env';
import SpinBox from '@/components/SpinBox';
import { StatusEnum } from '@/constants/enum';
import { useModalOkClick } from '@/components/TriggerModal';
import { promptTemplateListApi, insertUpdateWorkflowApi } from '@/services/workflow';
 
type CreateFormProps = {
  onSaveSuccess?: () => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();

  const {
    loading,
    data: templates
  } = useRequest(async (params) => {
    return promptTemplateListApi({
      ...params,
      statuses: [StatusEnum.Active]
    });
  });

  useModalOkClick(async () => {
    const values = await form.validateFields();
    await insertUpdateWorkflowApi({
      ...values,
      updatedBy: partId,
      flowContext: JSON.stringify({}),
      flowRelationship: JSON.stringify({})
    });
    props.onSaveSuccess?.();
  });

  return (
    <SpinBox loading={loading}>
      <ProForm
        form={form}
        submitter={false}
      >
        <ProFormText
          label="Workflow name"
          name="flowName"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          label="Template"
          name="promptUuid"
          options={templates?.data}
          fieldProps={{
            fieldNames: {
              label: 'promptName',
              value: 'promptUuid'
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

export default CreateForm;