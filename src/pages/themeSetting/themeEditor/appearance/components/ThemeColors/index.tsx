import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { type FC, useMemo, memo } from 'react';
import { ProFormItem, type FormInstance } from '@ant-design/pro-components';
import { useConfirm } from '@/hooks/useConfirm';
import { getVariableConfigs, updateFormData } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import ColorPickerInput from '../ColorPickerInput';
import { DarkTheme } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  form: FormInstance;
  sdk: AgentSdkInstance;
  setDefaultTheme: () => void;
}

const ThemeColors: FC<ThemeColorsProps> = (props) => {
  const { sdk, form, setDefaultTheme } = props;
  const { chat, bubble } = sdk.variables;

  const [confirm] = useConfirm();

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.ColorConfigs,
      'cssVariables'
    ),
    ...getVariableConfigs(
      chat.ColorConfigs,
      'chatCssVariables'
    )
  ]), [chat, bubble]);

  // 设置暗黑模式
  const setDarkTheme = useMemoizedFn(() => {
    updateFormData(form, DarkTheme);
    sdk.updateThemeConfigs(DarkTheme);
  });

  const handleSetSefault = useMemoizedFn(() => {
    confirm({
      title: 'Are you sure you want to reset all configuration to defaults?',
      onConfirm: () => setDefaultTheme()
    });
  });

  const handleSetDark = useMemoizedFn(() => {
    confirm({
      title: 'Are you sure you want to enable dark mode?',
      onConfirm: () => setDarkTheme()
    });
  });

  return (
    <CustomCollapse
      title="Colors"
      desc="Text, background, border, shadow, and other colors"
      tags={[
        <Tag key="default" onClick={handleSetSefault}>Default</Tag>,
        <Tag key="dark" onClick={handleSetDark}>Dark</Tag>
      ]}
    >
      <div className={styles.container}>
        {configs.map((item) => {
          return (
            <ProFormItem
              key={item.variable}
              label={item.label}
              name={item.name}
            >
              <ColorPickerInput />
            </ProFormItem>
          );
        })}
      </div>
    </CustomCollapse>
  );
}

export default memo(ThemeColors);