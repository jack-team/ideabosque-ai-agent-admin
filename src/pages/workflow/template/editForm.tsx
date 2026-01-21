import { type FC } from 'react';
import { App, Row, Col } from 'antd';
import { useSearchParams, useNavigate } from 'react-router';
import {
  ProForm,
  ProCard,
  ProFormText,
  ProFormSelect,
  PageContainer,
  ProFormItem,
  ProFormTextArea,
  ProFormList
} from '@ant-design/pro-components';
import Button from '@/components/Button';
import SpinBox from '@/components/SpinBox';
import type { WorkflowDataType } from '@/typings/workflow';
import McpServerSelect from '@/components/McpServerSelect';
import UiComponentSelect from '@/components/UiComponentSelect';
import { useUiComponentModel } from '@/components/UiComponentSelect';
import { useRequest, useUpdateEffect, useMemoizedFn, useSafeState } from 'ahooks';
import { promptTemplateDetailApi, insertUpdatePromptTemplateApi } from '@/services/workflow';
import { TemplateTypeMap } from './enum';
import { partId } from '@/env';

type EditFormProps = {
  workflow?: WorkflowDataType;
  onSaveSuccess?: () => void;
}

type FormDataType = {
  mcpServerUuids: string[];
  uiComponentUuids: string[];
  [key: string]: any;
}

type EditType = 'update' | 'new';

const EditForm: FC<EditFormProps> = (props) => {
  const { workflow } = props;
  const { message } = App.useApp();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [form] = ProForm.useForm<FormDataType>();
  const uiComponentList = useUiComponentModel(s => s.list);
  const [submitLoading, setSubmitLoading] = useSafeState(false);

  const promptUuid = search.get('promptUuid')!;
  const promptVersionUuid = search.get('promptVersionUuid')!;
  const editType = (search.get('editType') || 'update') as EditType;

  const {
    loading,
    data: detail
  } = useRequest(async () => {
    return promptTemplateDetailApi({
      promptUuid,
      promptVersionUuid
    });
  });

  // 保存
  const onSave = useMemoizedFn(async () => {
    const values = await form.validateFields();

    const {
      mcpServerUuids,
      uiComponentUuids,
      ...rest
    } = values;

    const mcpServers = mcpServerUuids.map(id => {
      return { mcpServerUuid: id };
    });

    const uiComponents = uiComponentUuids.map(id => {
      const item = uiComponentList.find(row => {
        return row.uiComponentUuid === id;
      });
      return {
        uiComponentUuid: item?.uiComponentUuid,
        uiComponentType: item?.uiComponentType
      }
    });

    const params: Record<string, any> = {
      ...rest,
      mcpServers,
      uiComponents,
      updatedBy: partId
    }

    if (editType === 'new') {
      params.promptVersionUuid = promptVersionUuid;
    }

    try {
      setSubmitLoading(true);
      await insertUpdatePromptTemplateApi(params);
      message.success("Template saved successfully.");
    } catch (err) {
      message.success("Template save failed.");
    } finally {
      setSubmitLoading(false);
    }
  });

  useUpdateEffect(() => {
    if (detail) {
      const { mcpServers, uiComponents } = detail;
      const mcpServerUuids = mcpServers.map(item => item.mcpServerUuid);
      const uiComponentUuids = uiComponents.map(item => item.uiComponentUuid);
      form.setFieldsValue({ ...detail, mcpServerUuids, uiComponentUuids });
    }
  }, [detail]);

  return (
    <SpinBox loading={loading}>
      <PageContainer
        title={detail?.promptName || 'Edit template'}
        onBack={() => navigate('/workflow/template', { replace: true })}
        extra={
          <Button
            type="primary"
            onClick={onSave}
            loading={submitLoading}
          >
            Save
          </Button>
        }
      >
        <ProCard>
          <ProForm<FormDataType>
            form={form}
            initialValues={workflow}
            submitter={false}
          >
            <ProFormText hidden name="promptUuid" />
            <ProFormText
              label="Template Name"
              name="promptName"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              label="Type"
              name="promptType"
              valueEnum={TemplateTypeMap}
              rules={[{ required: true }]}
            />
            <ProFormItem
              label="Mcp Servers"
              name="mcpServerUuids"
              rules={[{ required: true }]}
            >
              <McpServerSelect mode="multiple" />
            </ProFormItem>
            <ProFormItem
              label="Ui Components"
              name="uiComponentUuids"
              rules={[{ required: true }]}
            >
              <UiComponentSelect mode="multiple" />
            </ProFormItem>
            <ProFormTextArea
              name="promptDescription"
              label="Prompt description"
              fieldProps={{ rows: 6 }}
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name="templateContext"
              label="Prompt context"
              rules={[{ required: true }]}
              fieldProps={{ rows: 6 }}
            />
            <ProFormList
              label="Variables"
              name="variables"
              alwaysShowItemLabel
              className="custom-form-list"
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
        </ProCard>
      </PageContainer>
    </SpinBox>
  );
}

export default EditForm;