import { forwardRef } from 'react';
import { Space, App, Dropdown } from 'antd';
import { useMemoizedFn } from 'ahooks';
import copy from 'copy-to-clipboard';
import { CaretDownOutlined } from '@ant-design/icons'
import type { FormInstance } from '@ant-design/pro-components';
import ShopifyButton from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import JsonInput from './jsonInput';
import styles from './styles.module.less';

type PreviewProps = {
  sdk?: AgentSdkInstance;
  appearanceForm: FormInstance;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { sdk, appearanceForm } = props;
  const { message, modal } = App.useApp();

  const copyJson = useMemoizedFn(() => {
    copy(JSON.stringify(appearanceForm.getFieldsValue(true)));
    message.success('Config Json copied to clipboard.');
  });

  const loadJson = useMemoizedFn(
    (data: Record<string, any>) => {
      sdk?.updateThemeConfigs(data);
      appearanceForm.setFieldsValue(data);
      message.success('JSON loaded successfully.');
    }
  );

  const setOpenMode = useMemoizedFn((mode: string) => {
    sdk?.setOpenMode(mode);
  })

  const resetDefaults = useMemoizedFn(() => {
    modal.confirm({
      title: 'Are you sure you want to reset all configuration to defaults?',
      rootClassName: 'shopify',
      okButtonProps: {
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify'
      },
      onOk: () => {
        sdk?.resetThemeConfigs();
        appearanceForm.resetFields();
      }
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          Live Preview
        </div>
        <Space size={16}>
          <Dropdown
            rootClassName="shopify"
            menu={{
              items: [
                {
                  key: 'bubble',
                  label: 'Bubble',
                  onClick: () => setOpenMode('bubble')
                },
                {
                  key: 'window',
                  label: 'Window',
                  onClick: () => setOpenMode('window')
                }
              ]
            }}
          >
            <ShopifyButton
              type="primary"
            >
              <Space>
                <span>Open Mode</span>
                <CaretDownOutlined />
              </Space>
            </ShopifyButton>
          </Dropdown>
          <ShopifyButton
            type="primary"
            onClick={copyJson}
          >
            Copy Config Json
          </ShopifyButton>
          <TriggerModal
            width={800}
            title="Load Config Json"
            trigger={
              <ShopifyButton type="primary">
                Load Config Json
              </ShopifyButton>
            }
          >
            <JsonInput onSave={loadJson} />
          </TriggerModal>
          <ShopifyButton
            danger
            onClick={resetDefaults}
          >
            Reset to Defaults
          </ShopifyButton>
        </Space>
      </div>
      <div className={styles.content}>
        <div className={styles.target}>
          <div ref={ref} className={styles.ai_agent} />
        </div>
      </div>
    </div>
  )
})

export default Preview;