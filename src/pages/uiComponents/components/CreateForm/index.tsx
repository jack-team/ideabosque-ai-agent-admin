import type { FC } from "react";
import { App, Row, Col } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormList,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useListenModalOk, useModalClose } from "@/components/TriggerModal";
import { insetUpdateUiComponentApi } from "@/services/workflow";
import { ComponentTypeMap } from "../../const";
import styles from "./styles.module.less";

type CreateFormProps = {
  formData?: API.Workflow.UiComponentType;
  onSuccess?: () => void;
};

const CreateForm: FC<CreateFormProps> = (props) => {
  const { formData, onSuccess } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const values = await form.validateFields();
    try {
      await insetUpdateUiComponentApi({
        ...values,
        updatedBy: "Admin",
      });
      closeModal();
      onSuccess?.();
      message.success(
        `Successfully ${formData ? "updated" : "created"} UI component.`
      );
    } catch (err: any) {
      message.error(err.message);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
      className={styles.edit_form}
    >
      <ProFormText hidden name="uiComponentUuid" />
      <ProFormText
        label="Tag name"
        name="tagName"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="uiComponentType"
        label="Component type"
        rules={[{ required: true }]}
        valueEnum={ComponentTypeMap}
      />
      <ProFormText
        name="waitFor"
        label="Wait for"
        rules={[{ required: true }]}
      />
      <ProFormList
        label="Parameters"
        name="parameters"
        className={styles.form_list}
        required
        rules={[
          {
            validator: (_, value = [], callback) => {
              if (!value.length) {
                callback("Please add parameter");
                return;
              }
              callback();
            },
          },
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="Name"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="parameter"
              label="Parameter"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
};

export default CreateForm;
