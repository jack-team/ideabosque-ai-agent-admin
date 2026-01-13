import { type FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { partId } from '@/env';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdatePromptTemplateApi } from '@/services/workflow';
import type { PromptTemplateDataType } from '@/typings/workflow';
import { TemplateTypeMap } from './enum';

type CreateFormProps = {
  onSaveSuccess?: (record: PromptTemplateDataType) => void;
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    const result = await insertUpdatePromptTemplateApi({
      ...values,
      updatedBy: partId
    });
    props.onSaveSuccess?.(result);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
    >
      <ProFormText
        label="Template name"
        name="promptName"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="Template type"
        name="promptType"
        rules={[{ required: true }]}
        valueEnum={TemplateTypeMap}
        fieldProps={{ allowClear: false }}
      />
    </ProForm>
  );
}

export default CreateForm;