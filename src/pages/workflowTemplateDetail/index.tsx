import { cache, type FC } from 'react';
import { Card, Row, Col, Space } from 'antd';
import { useParams } from 'react-router-dom';
import SpinBox from '@/components/SpinBox';
import { ShopifyButton } from '@/components';
import { useMount, useMemoizedFn, useSafeState, useUpdateEffect } from 'ahooks';

import {
  ProForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormList
} from '@ant-design/pro-components';

import {
  fetchMcpServersApi,
  fetchuiComponentsApi,
  fetchWorkflowTemplateDetailApi,
  insertUpdatePromptTemplateApi
} from '@/services/workflow';

import { TemplateTypeMap } from '../workflowTemplates/const';

import styles from './styles.module.less';

type UrlParams = {
  uid: string;
  vid: string;
}

const WorkflowTemplateDetail: FC = () => {
  const [form] = ProForm.useForm();
  const { uid, vid } = useParams<UrlParams>();
  const [loading, setLoading] = useSafeState(true);
  const [detail, setDetail] = useSafeState<API.Workflow.PromptTemplateItem>();

  const fetchDetail = useMemoizedFn(async () => {
    const {
      promptTemplate: formData
    } = await fetchWorkflowTemplateDetailApi({
      promptUuid: uid,
      promptVersionUuid: vid
    });
    setLoading(false);
    setDetail(formData);
  });

  const setFormData = useMemoizedFn(() => {
    const { mcpServers, uiComponents } = detail!;
    form.setFieldsValue({
      ...detail,
      mcpServers: mcpServers.map(e => e.mcp_server_uuid),
      uiComponents: uiComponents.map(e => e.ui_component_uuid)
    });
  });


  const handleSubmit = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    const mcpServers = (formData.mcpServers || []) as string[];
    const uiComponents = (formData.uiComponents || []) as string[];

    try {
      setLoading(true);
      await insertUpdatePromptTemplateApi({
        ...formData,
        promptUuid: uid,
        promptVersionUuid: vid,
        uiComponents: uiComponents.map(id => {
          return {
            ui_component_uuid: id,
            ui_component_type: ''
          }
        }),
        mcpServers: mcpServers.map(id => {
          return {
            mcp_server_uuid: id
          }
        }),
        updatedBy: 'admin',
      });
    } catch (err) {

    } finally {
      setLoading(false);
    }
  });

  useMount(fetchDetail);

  useUpdateEffect(() => {
    detail && setFormData();
  }, [detail]);

  return (
    <PageContainer
      title={detail?.promptName}
      className="shopify full-screen"
      extra={
        <Space>
          <ShopifyButton
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Save
          </ShopifyButton>
        </Space>
      }
    >
      <div className={styles.wrapper}>
        <SpinBox loading={loading}>
          <Card className="shopify">
            <ProForm
              form={form}
              submitter={false}
              layout="horizontal"
              labelAlign="left"
              className={styles.form}
              labelCol={{ flex: '180px' }}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <ProFormText
                    label="Template Name"
                    name="promptName"
                    rules={[
                      { required: true }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <ProFormSelect
                    label="Type"
                    name="promptType"
                    valueEnum={TemplateTypeMap}
                    rules={[
                      { required: true }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <ProFormSelect
                    label="Mcp Servers"
                    name="mcpServers"
                    mode="multiple"
                    rules={[
                      { required: true }
                    ]}
                    request={async () => {
                      const {
                        mcpServerList: result
                      } = await fetchMcpServersApi({
                        pageNumber: 1,
                        limit: 1000
                      });
                      return result.mcpServerList.map(item => {
                        return {
                          label: item.mcpLabel,
                          value: item.mcpServerUuid
                        }
                      })
                    }}
                  />
                </Col>
                <Col span={24}>
                  <ProFormSelect
                    label="Ui Components"
                    name="uiComponents"
                    mode="multiple"
                    rules={[
                      { required: true }
                    ]}
                    request={async () => {
                      const {
                        uiComponentList: result
                      } = await fetchuiComponentsApi({
                        pageNumber: 1,
                        limit: 1000
                      });
                      return result.uiComponentList.map(item => {
                        return {
                          label: item.tagName,
                          value: item.uiComponentUuid
                        }
                      });
                    }}
                  />
                </Col>
              </Row>
              <ProFormTextArea
                label="Template Description"
                name="promptDescription"
                fieldProps={{ rows: 12 }}
                rules={[
                  { required: true }
                ]}
              />
              <ProFormTextArea
                label="Template Context"
                name="templateContext"
                fieldProps={{ rows: 12 }}
                rules={[
                  { required: true }
                ]}
              />
              <ProFormList
                required
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
        </SpinBox>
      </div>
    </PageContainer>
  );
}

export default WorkflowTemplateDetail;