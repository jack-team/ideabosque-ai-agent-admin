import { type FC, useEffect } from "react";
import { Card, Row, Col, Space, App } from "antd";
import { useParams, useLocation } from "react-router-dom";
import { useMount, useMemoizedFn, useSafeState } from "ahooks";

import {
  ProForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormList,
} from "@ant-design/pro-components";

import {
  fetchMcpServersApi,
  fetchuiComponentsApi,
  fetchWorkflowTemplateDetailApi,
  insertUpdatePromptTemplateApi,
} from "@/services/workflow";

import SpinBox from "@/components/SpinBox";
import { ShopifyButton } from "@/components";
import {
  splitTag,
  dateTransformFormData,
  formDataTransformRequestParams,
} from "./helper";
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
  const { uid, vid } = useParams<UrlParams>();
  const [loading, setLoading] = useSafeState(false);
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
          <Card className="shopify">
            <ProForm
              form={form}
              submitter={false}
              layout="horizontal"
              labelAlign="left"
              className={styles.form}
              labelCol={{ flex: "180px" }}
            >
              <ProFormText hidden name="promptUuid" />
              <ProFormText hidden name="promptVersionUuid" />
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
                    rules={[{ required: true }]}
                    request={async () => {
                      const { mcpServerList: result } =
                        await fetchMcpServersApi({
                          pageNumber: 1,
                          limit: 1000,
                        });
                      return result.mcpServerList.map((item) => {
                        return {
                          label: item.mcpLabel,
                          value: item.mcpServerUuid,
                        };
                      });
                    }}
                  />
                </Col>
                <Col span={24}>
                  <ProFormSelect
                    label="Ui Components"
                    name="uiComponents"
                    mode="multiple"
                    rules={[{ required: true }]}
                    request={async () => {
                      const { uiComponentList: result } =
                        await fetchuiComponentsApi({
                          pageNumber: 1,
                          limit: 1000,
                        });
                      return result.uiComponentList.map((item) => {
                        const val = [
                          item.uiComponentUuid,
                          item.uiComponentType,
                        ].join(splitTag);
                        return {
                          label: item.tagName,
                          value: val,
                        };
                      });
                    }}
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
                className={styles.form_list}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="name"
                      placeholder="Variable Name"
                      rules={[{ required: true }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="data_type"
                      placeholder="Data type"
                      rules={[{ required: true }]}
                    />
                  </Col>
                </Row>
              </ProFormList>
            </ProForm>
          </Card>
        </div>
      </PageContainer>
    </SpinBox>
  );
};

export default WorkflowTemplateDetail;
