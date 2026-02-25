import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { type FC, useMemo, memo } from 'react';
import { ProFormItem, type FormInstance } from '@ant-design/pro-components';
import { useConfirm } from '@/hooks/useConfirm';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs, updateFormData } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import ColorPickerInput from '../ColorPickerInput';
import { DarkTheme } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  form: FormInstance;
  sdk: AgentSdkInstance;
  resetDefaults: () => void;
}

const ThemeColors: FC<ThemeColorsProps> = (props) => {
  const { sdk, resetDefaults } = props;
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
        chat.ColorConfigs,
        'chatCssVariables'
      )
    ];
  }, [sdk.variables]);

  // 设置暗黑模式
  const setDarkTheme = useMemoizedFn(() => {
    confirm({
      title: t('theme.Are you sure you want to enable dark mode'),
      onConfirm: () => {
        sdk.updateThemeConfigs(DarkTheme);
        updateFormData(props.form, DarkTheme);
      }
    });
  });

  return (
    <CustomCollapse
      title={t('theme.Colors')}
      desc={t('theme.Text, background, border, shadow, and other colors')}
      tags={[
        <Tag key="default" onClick={resetDefaults}>{t('theme.Default')}</Tag>,
        <Tag key="dark" onClick={setDarkTheme}>{t('theme.Dark')}</Tag>
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