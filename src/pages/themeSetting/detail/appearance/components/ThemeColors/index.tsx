import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { type FC, useMemo, memo } from 'react';
import { ProFormItem, type FormInstance } from '@ant-design/pro-components';
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

  return (
    <CustomCollapse
      title="Colors"
      desc="Text, background, border, shadow, and other colors"
      tags={[
        <Tag key="default" onClick={setDefaultTheme}>Default</Tag>,
        <Tag key="dark" onClick={setDarkTheme}>Dark</Tag>
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