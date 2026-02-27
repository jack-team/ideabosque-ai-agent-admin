import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { type FC, useMemo, memo } from 'react';
import { ProFormItem, type FormInstance } from '@ant-design/pro-components';
import { useConfirm } from '@/hooks/useConfirm';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs, updateFormData } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import ColorPickerInput from '../ColorPickerInput';
import { DarkTheme, StandardTheme } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  form: FormInstance;
  sdk: AgentSdkInstance;
  resetDefaults: () => void;
  resetThemeAction: () => void;
}

const ThemeColors: FC<ThemeColorsProps> = (props) => {
  const { sdk, resetDefaults, resetThemeAction } = props;
  const [confirm] = useConfirm();
  const { t } = useLang();

  const configs = useMemo(() => {
    const { chat, bubble } = sdk.variables;
    return [
      ...getVariableConfigs(
        bubble.ColorConfigs,
        'cssVariables'
      ),
      ...getVariableConfigs(
        chat.chatBase.ColorConfigs,
        'chatCssVariables'
      )
    ];
  }, [sdk.variables]);

  const updateThemeAction = useMemoizedFn(
    (themeData: Record<string, any>) => {
      resetThemeAction();
      sdk.updateThemeConfigs(themeData);
      updateFormData(props.form, themeData);
    }
  );

  // 设置暗黑模式
  const setDarkTheme = useMemoizedFn(() => {
    confirm({
      title: t('theme.Are you sure you want to enable dark mode'),
      onConfirm: () => updateThemeAction(DarkTheme)
    });
  });

  const setStandardTheme = useMemoizedFn(() => {
    confirm({
      title: t('theme.Are you sure you want to enable standard mode'),
      onConfirm: () => updateThemeAction(StandardTheme)
    });
  });

  return (
    <CustomCollapse
      title={t('theme.Colors')}
      desc={t('theme.Text, background, border, shadow, and other colors')}
      tags={[
        <Tag key="light" onClick={resetDefaults}>{t('theme.Light Mode')}</Tag>,
        <Tag key="standard" onClick={setStandardTheme}>{t('theme.Standard Mode')}</Tag>,
        <Tag key="dark" onClick={setDarkTheme}>{t('theme.Dark Mode')}</Tag>
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