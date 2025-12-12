import { type FC, useEffect } from "react";
import { Row, Col, Space, App } from "antd";
import { useMemoizedFn, useSafeState } from "ahooks";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ProForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormList,
} from "@ant-design/pro-components";
import {
  dateTransformFormData,
  formDataTransformRequestParams,
} from "./helper";
import {
  fetchWorkflowTemplateDetailApi,
  insertUpdatePromptTemplateApi,
} from "@/services/workflow";
import {
  useMcpServers,
  useUiComponents
} from '@/hooks/useFetchData';
import SpinBox from "@/components/SpinBox";
import { ShopifyButton } from "@/components";
import { TemplateTypeMap } from "../workflowTemplates/const";
import styles from "./styles.module.less";

type UrlParams = {
  uid: string;
  vid: string;
};

const WorkflowTemplateDetail: FC = () => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const { state } = useLocation();
  const navigate = useNavigate()
  const { uid, vid } = useParams<UrlParams>();
  const [loading, setLoading] = useSafeState(false);
  const { options: uiOptions, loading: uiLoading } = useUiComponents();
  const { options: mcpOptions, loading: mcpLoading } = useMcpServers();

  const [detail, setDetail] =
    useSafeState<API.Workflow.PromptTemplateItem>(state);

  const fetchDetail = useMemoizedFn(async () => {
    const { promptTemplate: formData } = await fetchWorkflowTemplateDetailApi({
      promptUuid: uid,
      promptVersionUuid: vid,
    });
    setDetail(formData);
  });

  const setFormData = useMemoizedFn(() => {
    const formData = dateTransformFormData(detail);
    form.setFieldsValue(formData);
  });

  const handleSubmit = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    try {
      setLoading(true);
      const params = formDataTransformRequestParams(formData);
      await insertUpdatePromptTemplateApi(params);
      message.success("Template saved successfully.");
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (detail) {
      setFormData();
    } else {
      fetchDetail();
    }
  }, [detail]);

  return (
    <SpinBox loading={!detail}>
      <PageContainer
        title={detail?.promptName}
        className="shopify full-screen"
        onBack={() => navigate(-1)}
        extra={
          <Space>
            <ShopifyButton
              type="primary"
              loading={loading}
              disabled={!detail}
              onClick={handleSubmit}
            >
              Save
            </ShopifyButton>
          </Space>
        }
      >
        <div className={styles.wrapper}>
          <ProForm
            form={form}
            submitter={false}
            className={styles.form}
          >
            <ProFormText hidden name="promptUuid" />
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  label="Template Name"
                  name="promptName"
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={24}>
                <ProFormSelect
                  label="Type"
                  name="promptType"
                  valueEnum={TemplateTypeMap}
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={24}>
                <ProFormSelect
                  label="Mcp Servers"
                  name="mcpServers"
                  mode="multiple"
                  options={mcpOptions}
                  rules={[{ required: true }]}
                  fieldProps={{ loading: mcpLoading }}
                />
              </Col>
              <Col span={24}>
                <ProFormSelect
                  label="Ui Components"
                  name="uiComponents"
                  mode="multiple"
                  options={uiOptions}
                  rules={[{ required: true }]}
                  fieldProps={{ loading: uiLoading }}
                />
              </Col>
            </Row>
            <ProFormTextArea
              label="Template Description"
              name="promptDescription"
              fieldProps={{ rows: 12 }}
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              label="Template Context"
              name="templateContext"
              fieldProps={{ rows: 12 }}
              rules={[{ required: true }]}
            />
            <ProFormList
              label="Variables"
              name="variables"
              className="custom_form_list"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <ProFormText
                    name="name"
                    label="Variable Name"
                    rules={[{ required: true }]}
                  />
                </Col>
                <ProFormText
                  hidden
                  name="data_type"
                  initialValue="string"
                  placeholder="Data type"
                  rules={[{ required: true }]}
                />
              </Row>
            </ProFormList>
          </ProForm>
        </div>
      </PageContainer>
    </SpinBox>
  );
};

export default WorkflowTemplateDetail;
