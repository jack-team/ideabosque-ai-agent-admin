import type { FC } from 'react';
import * as uuid from 'uuid'
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useListenModalOk } from '@/components/TriggerModal/hooks';
import { insertUpdateWorkflowApi } from '@/services/workflow';
import styles from './styles.module.less';

type CreateFormProps = {
  onSuccess?: (result: API.Workflow.FlowSnippet) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    const {
      insertUpdateFlowSnippet: result
    } = await insertUpdateWorkflowApi({
      ...formData,
      updatedBy: 'admin',
      flowContext: JSON.stringify({}),
      flowRelationship: JSON.stringify({}),
      promptUuid: `prompt-${uuid.v4()}`,
      promptVersionUuid: `prompt-version-${uuid.v4()}`
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
    </ProForm>
  );
}

export default CreateForm;