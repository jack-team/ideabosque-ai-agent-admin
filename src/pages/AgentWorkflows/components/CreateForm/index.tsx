import type { FC } from 'react';
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useListenModalOk } from '@/components/TriggerModal/hooks';
import { useWorkFlowTemplates } from '@/hooks/useFetchData';
import { insertUpdateWorkflowApi } from '@/services/workflow';
import styles from './styles.module.less';

type CreateFormProps = {
  onSuccess?: (result: API.Workflow.FlowSnippet) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { options, loading } = useWorkFlowTemplates();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    const {
      insertUpdateFlowSnippet: result
    } = await insertUpdateWorkflowApi({
      ...formData,
      updatedBy: 'admin',
      flowContext: JSON.stringify({}),
      flowRelationship: JSON.stringify({})
    });
    props.onSuccess?.(result.flowSnippet);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      className={styles.form}
    >
      <ProFormText
        label="Workflow name"
        name="flowName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="Template"
        name="promptUuid"
        options={options}
        fieldProps={{ loading }}
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default CreateForm;