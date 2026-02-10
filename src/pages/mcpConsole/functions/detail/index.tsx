import type { FC } from 'react';
import { Row, Col, App } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-components';
import Button from '@/components/Button';
import { useRequest, useUpdateEffect, useSafeState, useMemoizedFn } from 'ahooks';
import { useNavigate, useParams } from 'react-router';
import PageContainer from '@/components/PageContainer';
import SpinBox from '@/components/SpinBox';
import FunctionCalls from '../calls';
import { getFunctionDetailApi } from '@/services/mcpConsole';
import { insertUpdateMcpFunctionApi } from '@/services/mcpConsole';
import { partId } from '@/env';

const FunctionDetail: FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const { name } = useParams<{ name: string }>();
  const [submitLoading, setSubmitLoading] = useSafeState(false);

  const {
    data,
    loading
  } = useRequest(async () => {
    return getFunctionDetailApi({ name: name! });
  });

  useUpdateEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data]);

  const handleSave = useMemoizedFn(async () => {
    const values = await form.validateFields();
    setSubmitLoading(true);
    try {
      const params = {
        ...values,
        updatedBy: partId,
      };
      await insertUpdateMcpFunctionApi(params);
      message.success(`Function updated successfully.`);
    } catch (error) {
      message.error('Failed to update function');
      console.error('Function form error:', error);
    }
    setSubmitLoading(false);
  })

  return (
    <SpinBox loading={loading}>
      <PageContainer
        title={`Function Details${data ? `: ${data.name}` : ''}`}
        onBack={() => navigate('/mcp-console', { replace: true })}
        extra={
          <Button
            type="primary"
            onClick={handleSave}
            loading={submitLoading}
          >
            Save
          </Button>
        }
      >
        <ProCard title="Function Details">
          <ProForm
            form={form}
            submitter={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label="Function name"
                  name="name"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Type"
                  name="mcpType"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={24}>
                <ProFormTextArea
                  label="Description"
                  name="description"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Module name"
                  name="moduleName"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Class name"
                  name="className"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Function name (Method)"
                  name="functionName"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Return type"
                  name="returnType"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={24}>
                <ProFormText
                  label="Annotations"
                  name="annotations"
                />
              </Col>
              <Col span={24}>
                <ProFormSwitch
                  label="Is Async?"
                  name="returnType"
                />
              </Col>
            </Row>
          </ProForm>
        </ProCard>
        {!!data && (
          <ProCard
            title="Function calls"
            subTitle="These are all instances of this specific function across Workflows."
          >
            <FunctionCalls funcName={name!} />
          </ProCard>
        )}
      </PageContainer>
    </SpinBox>
  );
}

export default FunctionDetail;