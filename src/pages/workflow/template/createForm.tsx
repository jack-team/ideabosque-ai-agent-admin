import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { getPartId } from '@/env';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdatePromptTemplateApi } from '@/services/workflow';
import type { PromptTemplateDataType } from '@/typings/workflow';
import { TemplateTypeMap } from './enum';
import { objectIteration } from '@/utils';

type CreateFormProps = {
  onSaveSuccess?: (record: PromptTemplateDataType) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { t } = useLang();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    const result = await insertUpdatePromptTemplateApi({
      ...values,
      templateContext: '',
      updatedBy: getPartId()
    });
    props.onSaveSuccess?.(result.promptTemplate);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
    >
      <ProFormText
        label={t('workflow.templateName')}
        name="promptName"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label={t('workflow.templateType')}
        name="promptType"
        rules={[{ required: true }]}
        valueEnum={objectIteration(TemplateTypeMap, t)}
        fieldProps={{ allowClear: false }}
      />
    </ProForm>
  );
}

export default CreateForm;