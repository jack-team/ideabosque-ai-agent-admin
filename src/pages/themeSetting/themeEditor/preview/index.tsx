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
import { updateFormData } from '../helper';
import { useConfirm } from '@/hooks/useConfirm';
import type { ThemeEditorProps } from '../types';
import styles from './styles.module.less';

type PreviewProps = ThemeEditorProps & {
  sdk?: AgentSdkInstance;
  baseForm: FormInstance;
  actionForm: FormInstance;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { sdk, baseForm, actionForm, themeData } = props;
  const [confirm] = useConfirm();
  const { message } = App.useApp();

  const openMode = ProForm.useWatch('openMode', actionForm);
  const position = ProForm.useWatch('position', actionForm);

  // 复制主题 Json
  const copyJson = useMemoizedFn(() => {
    copy(JSON.stringify(baseForm.getFieldsValue(true)));
    message.success('Config Json copied to clipboard.');
  });

  // 加载主题 Json
  const loadJson = useMemoizedFn(
    (data: Record<string, any>) => {
      sdk?.updateThemeConfigs(data);
      baseForm.setFieldsValue(data);
      message.success('JSON loaded successfully.');
    }
  );

  // 获取默认主题值
  const getDefaultTheme = useMemoizedFn(() => {
    const { chat, bubble } = sdk!.variables;
    return {
      uiVariables: bubble.GlobalUiVariables,
      cssVariables: bubble.GlobalCssVariables,
      chatUiVariables: chat.GlobalUiVariables,
      chatCssVariables: chat.GlobalCssVariables
    }
  });

  // 重置主题到默认主题
  const resetDefaults = useMemoizedFn(() => {
    confirm({
      title: 'Are you sure you want to reset all configuration to defaults?',
      onConfirm: () => {
        const theme = getDefaultTheme();
        updateFormData(baseForm, theme);
        sdk!.updateThemeConfigs(theme);
      }
    });
  });

  useUpdateEffect(() => {
    if (openMode) sdk?.setOpenMode(openMode);
  }, [openMode]);

  useUpdateEffect(() => {
    if (position) sdk?.setBubblePosition(position);
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
          initialValues={{
            openMode: themeData.openMode,
            position: themeData.position
          }}
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
              resetDefaults={resetDefaults}
              getDefaultTheme={getDefaultTheme}
              defaultBasicTheme={themeData.basic}
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