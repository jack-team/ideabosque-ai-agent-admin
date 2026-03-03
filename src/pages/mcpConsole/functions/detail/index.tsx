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
import { useParams } from 'react-router';
import { useNavigate } from '@/hooks/useNavigate';
import { useLang } from '@/hooks/useLang';
import { useConfirm } from '@/hooks/useConfirm';
import PageContainer from '@/components/PageContainer';
import SpinBox from '@/components/SpinBox';
import FunctionCalls from '../calls';
import { getFunctionDetailApi } from '@/services/mcpConsole';
import { insertUpdateMcpFunctionApi } from '@/services/mcpConsole';
import { partId } from '@/env';

const FunctionDetail: FC = () => {
  const { t } = useLang();
  const [confirm] = useConfirm();
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

  const handleSave = useMemoizedFn(() => {
    confirm({
      title: t('common.updateTipText'),
      enableConfirm: true,
      onConfirm: async () => {
        const values = await form.validateFields();
        setSubmitLoading(true);
        try {
          const params = {
            ...values,
            updatedBy: partId,
          };
          await insertUpdateMcpFunctionApi(params);
          message.success(t('common.Saved successfully'));
        } catch (error) {
          message.error(t('common.Failed to save, please contact the administrator'));
          console.error('Function form error:', error);
        }
        setSubmitLoading(false);
      }
    });
  })

  return (
    <SpinBox loading={loading}>
      <PageContainer
        title={`${t('mcpConsole.Function Details')}${data ? `: ${data.name}` : ''}`}
        onBack={() => navigate('/mcp-console', { replace: true })}
        extra={
          <Button
            type="primary"
            onClick={handleSave}
            loading={submitLoading}
          >
            {t('common.save')}
          </Button>
        }
      >
        <ProCard title={t('mcpConsole.Function Details')}>
          <ProForm
            form={form}
            submitter={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  disabled
                  label={t('mcpConsole.Function Name')}
                  name="name"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={t('mcpConsole.type')}
                  name="mcpType"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={24}>
                <ProFormTextArea
                  label={t('mcpConsole.description')}
                  name="description"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={t('mcpConsole.Module name')}
                  name="moduleName"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={t('mcpConsole.Class name')}
                  name="className"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={t('mcpConsole.Function name (Method)')}
                  name="functionName"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={t('mcpConsole.Return Type')}
                  name="returnType"
                  rules={[
                    { required: true }
                  ]}
                />
              </Col>
              <Col span={24}>
                <ProFormText
                  label={t('mcpConsole.Annotations')}
                  name="annotations"
                />
              </Col>
              <Col span={24}>
                <ProFormSwitch
                  label={t('mcpConsole.Is Async?')}
                  name="isAsync"
                />
              </Col>
            </Row>
          </ProForm>
        </ProCard>
        {!!data && (
          <ProCard
            title={t('mcpConsole.Function calls')}
            subTitle={t('mcpConsole.Function calls desc')}
          >
            <FunctionCalls funcName={name!} />
          </ProCard>
        )}
      </PageContainer>
    </SpinBox>
  );
}

export default FunctionDetail;