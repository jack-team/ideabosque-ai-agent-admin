import { type FC, useMemo } from "react";
import { App, Row, Col } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormList,
} from "@ant-design/pro-components";
import { useListenModalOk, useModalClose } from "@/components/TriggerModal";
import { dataTransformFormData, formDataTransformRequestParams } from './helper';
import { insertUpdateMcpServerApi } from "@/services/workflow";
import styles from "./styles.module.less";

type CreateFormProps = {
  formData?: API.Workflow.McpServerItem;
  onSuccess?: () => void;
};

const CreateForm: FC<CreateFormProps> = (props) => {
  const { formData, onSuccess } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

  const initialValues = useMemo(() => {
    if (!formData) return;
    return dataTransformFormData(formData);
  }, [formData]);

  useListenModalOk(async () => {
    const values = await form.validateFields();
    const params = formDataTransformRequestParams(values);
    try {
      await insertUpdateMcpServerApi(params);
      closeModal();
      onSuccess?.();
      message.success(
        `Successfully ${formData ? "updated" : "created"} Mcp server.`
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
      scrollToFirstError
      initialValues={initialValues}
      className={styles.edit_form}
    >
      <ProFormText hidden name="mcpServerUuid" />
      <ProFormText
        label="Mcp label"
        name="mcpLabel"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="mcpServerUrl"
        label="Mcp server url"
        rules={[{ required: true, type: "url" }]}
      />
      <ProFormList
        required
        label="Headers"
        name="headers"
        initialValue={[{}]}
        alwaysShowItemLabel
        className="custom_form_list"
        creatorButtonProps={{
          creatorButtonText: "Add Header"
        }}
        rules={[
          {
            validator: (_, value = [], callback) => {
              if (!value.length) {
                callback("Please add Header");
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
              required
              label="Key"
              name="key"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              required
              label="Value"
              name="value"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
};

export default CreateForm;
