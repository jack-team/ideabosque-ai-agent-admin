import qs from 'qs';
import { type FC, useMemo, useRef } from 'react';
import ShopifyButton from '@/components/ShopifyButton'
import { PageContainer } from '@ant-design/pro-components';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components'
import SpinBox from '@/components/SpinBox';
import { useCoordinationList, useEndpointId } from './hooks';
import styles from './styles.module.less';

type FormDataType = {
  coordination: string;
  agent: string;
}

type OptionType = {
  label: string;
  value: string;
}

const aibotUrl = 'https://shopify-ai-chat.pages.dev';

const Preview: FC = () => {
  const [form] = ProForm.useForm();
  const endpointId = useEndpointId();
  const agentsOptionsRef = useRef<OptionType[]>([]);
  const [iframeLoading, setIframeLoading] = useSafeState(false);
  const { data = [], loading: dataLoading } = useCoordinationList();
  const [formData, setFormData] = useSafeState<FormDataType | undefined>();

  const urlSearch = useMemo(() => {
    return qs.stringify({ ...formData, mode: 'preview' });
  }, [formData]);

  const handleSubmit = useMemoizedFn(async () => {
    const values = await form.validateFields();
    const agentId = values.agent;
    const options = agentsOptionsRef.current;
    const agent = options.find(e => e.value === agentId);
    setFormData({ ...values, endpointId, agentName: agent?.label });
  });

  const onIframeLoadStart = useMemoizedFn(() => setIframeLoading(true));
  const onIframeLoadEnd = useMemoizedFn(() => setIframeLoading(false));

  useUpdateEffect(onIframeLoadStart, [urlSearch]);

  return (
    <PageContainer
      title="Preview"
      className="shopify full-screen"
    >
      <div className={styles.container}>
        <div className={styles.preview}>
          <SpinBox loading={iframeLoading}>
            <div className={styles.preview_box}>
              {formData ? (
                <iframe
                  width="100%"
                  height="100%"
                  allow="geolocation;"
                  onLoad={onIframeLoadEnd}
                  src={`${aibotUrl}?${urlSearch}`}
                />
              ) : (
                <div className={styles.placeholder}>
                  Please select Coordination and Agency to preview.
                </div>
              )}
            </div>
          </SpinBox>
        </div>
        <div className={styles.contrl}>
          <ProForm
            form={form}
            submitter={false}
            className={styles.form}
          >
            <ProFormSelect
              label="Coordination"
              name="coordination"
              options={data}
              fieldProps={{
                placement: 'bottomRight',
                popupMatchSelectWidth: false,
                loading: dataLoading,
                onChange: () => {
                  form.resetFields(['agent']);
                }
              }}
              rules={[
                { required: true }
              ]}
            />
            <ProFormDependency name={['coordination']}>
              {({ coordination }) => {
                if (!coordination) return null;

                const agents = data.find(e => {
                  return e.value === coordination;
                })?.agents || [];

                const options = agents.map(item => {
                  const label = item.agent_name
                  const value = item.agent_uuid;
                  return {
                    label: label || value,
                    value: value
                  }
                });

                agentsOptionsRef.current = options;

                return (
                  <ProFormSelect
                    label="Agent"
                    name="agent"
                    options={options}
                    fieldProps={{
                      placement: 'bottomLeft',
                      popupMatchSelectWidth: false,
                    }}
                    rules={[
                      { required: true }
                    ]}
                  />
                )
              }}
            </ProFormDependency>
            <div className={styles.submitter}>
              <ShopifyButton
                block
                type="primary"
                size="large"
                onClick={handleSubmit}
              >
                Apply
              </ShopifyButton>
            </div>
          </ProForm>
        </div>
      </div>
    </PageContainer>
  );
}

export default Preview;