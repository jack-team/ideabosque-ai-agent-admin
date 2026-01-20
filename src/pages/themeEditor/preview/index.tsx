import { forwardRef } from 'react';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import { Space, App } from 'antd';
import { useMemoizedFn, useUpdateEffect } from 'ahooks';
import { ProForm, type FormInstance, ProFormText, ProFormItem } from '@ant-design/pro-components';
import Button from '@/components/Button';
import SelectButton from '@/components/SelectButton';
import TriggerModal from '@/components/TriggerModal';
import { ChatModes, ChatPositions } from '@/constants/options';
import JsonInput from './jsonInput';
import Appearance from '../appearance';
import { useConfirm } from '@/hooks/useConfirm';
import styles from './styles.module.less';

type PreviewProps = {
  sdk?: AgentSdkInstance;
  baseForm: FormInstance;
}

const initialValues = {
  openMode: 'window',
  position: 'bottomRight'
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { sdk, baseForm } = props;
  const [confirm] = useConfirm();
  const { message } = App.useApp();
  const [actionForm] = ProForm.useForm();

  const openMode = ProForm.useWatch('openMode', actionForm);
  const position = ProForm.useWatch('position', actionForm);

  const copyJson = useMemoizedFn(() => {
    copy(JSON.stringify(baseForm.getFieldsValue(true)));
    message.success('Config Json copied to clipboard.');
  });

  const loadJson = useMemoizedFn(
    (data: Record<string, any>) => {
      sdk?.updateThemeConfigs(data);
      baseForm.setFieldsValue(data);
      message.success('JSON loaded successfully.');
    }
  );

  const resetDefaults = useMemoizedFn(() => {
    confirm({
      title: 'Are you sure you want to reset all configuration to defaults?',
      onConfirm: () => {
        sdk?.resetThemeConfigs();
        baseForm.resetFields();
      }
    });
  });

  useUpdateEffect(() => {
    if (openMode) {
      sdk?.setOpenMode(openMode);
    }
  }, [openMode]);

  useUpdateEffect(() => {
    if (position) {
      sdk?.setBubblePosition(position);
    }
  }, [position]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          Live Preview
        </div>
        <ProForm
          submitter={false}
          form={actionForm}
          initialValues={initialValues}
        >
          <Space size={16}>
            <ProFormItem noStyle name="openMode">
              <SelectButton
                size="middle"
                options={ChatModes}
                placeholder="Open Mode"
              />
            </ProFormItem>
            <ProFormText hidden name="position" noStyle />
            <Button onClick={copyJson}>
              Copy Config Json
            </Button>
            <TriggerModal
              width={800}
              title="Load Config Json"
              trigger={<Button>Load Config Json</Button>}
            >
              <JsonInput onSave={loadJson} />
            </TriggerModal>
            <Button
              className="gray-mode"
              onClick={resetDefaults}
            >
              Reset to Defaults
            </Button>
          </Space>
        </ProForm>
      </div>
      <div className={styles.content}>
        <div className={styles.actions}>
          {!!sdk && (
            <Appearance
              sdk={sdk}
              form={baseForm}
            />
          )}
        </div>
        <div className={classNames(styles.target, styles[openMode])}>
          <div className={styles.position_mode}>
            <SelectButton
              size="middle"
              value={position}
              options={ChatPositions}
              placeholder="Bubble direction"
              onChange={position => actionForm.setFieldsValue({ position })}
            />
          </div>
          <div ref={ref} className={styles.ai_agent} />
        </div>
      </div>
    </div>
  );
});

export default Preview;