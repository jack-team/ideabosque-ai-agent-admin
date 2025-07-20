import type { FC } from "react";
import { App } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useListenModalOk, useModalClose } from "@/components/TriggerModal";
import { insertUpdatePromptTemplateApi } from "@/services/workflow";
import { TemplateTypeMap } from "../../const";
import { TemplateType } from "../../enum";
import styles from "./styles.module.less";

type CreateFormProps = {
  onSuccess?: (result: API.Workflow.PromptTemplateItem) => void;
};

const CreateForm: FC<CreateFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    try {
      const { insertUpdatePromptTemplate: result } =
        await insertUpdatePromptTemplateApi({
          ...values,
          templateContext: "",
          updatedBy: "Admin",
        });
      closeModal();
      props.onSuccess?.(result.promptTemplate);
    } catch (err: any) {
      message.error(err.message);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm form={form} submitter={false} className={styles.edit_form}>
      <ProFormText
        label="Template name"
        name="promptName"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="Template type"
        name="promptType"
        valueEnum={TemplateTypeMap}
        initialValue={TemplateType.SystemPrompt}
        rules={[{ required: true }]}
      />
    </ProForm>
  );
};

export default CreateForm;
