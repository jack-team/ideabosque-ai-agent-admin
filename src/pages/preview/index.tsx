import qs from 'qs';
import { type FC, useMemo } from 'react';
import ShopifyButton from '@/components/ShopifyButton'
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-components';
import SpinBox from '@/components/SpinBox';
import { useCoordinationList, useEndpointId } from './hooks';
import styles from './styles.module.less';

type FormDataType = {
  coordination: string;
  agent: string;
}

const aibotUrl = 'https://ideabosque-ai-chat.pages.dev';

const Preview: FC = () => {
  const [form] = ProForm.useForm();
  const endpointId = useEndpointId();
  const [iframeLoading, setIframeLoading] = useSafeState(false);
  const [formData, setFormData] = useSafeState<FormDataType | undefined>();
  const { data = [], loading: dataLoading } = useCoordinationList();

  const urlSearch = useMemo(() => {
    return qs.stringify({ ...formData, mode: 'preview' });
  }, [formData]);

  const handleSubmit = useMemoizedFn(async () => {
    const values = await form.validateFields();
    setFormData({ ...values, endpointId });
  });

  const onIframeLoadStart = useMemoizedFn(() => {
    setIframeLoading(true)
  });

  const onIframeLoadEnd = useMemoizedFn(() => {
    setIframeLoading(false)
  });

  useUpdateEffect(onIframeLoadStart, [urlSearch]);

  return (
    <PageContainer
      title="Preview"
      className="shopify full-screen"
    >
      <div className={styles.container}>
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

                const item = data.find(e => {
                  return e.value === coordination;
                });

                const options = item?.agents.map(item => {
                  return {
                    label: item.agent_uuid,
                    value: item.agent_uuid
                  }
                });

                return (
                  <ProFormSelect
                    label="Agent"
                    name="agent"
                    options={options}
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
      </div>
    </PageContainer>
  );
}

export default Preview;