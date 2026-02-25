import { type FC, useMemo } from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs } from '../../../helper';
import SliderInput from '../SliderInput';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeFontProps = {
  sdk: AgentSdkInstance;
}

const ThemeFont: FC<ThemeFontProps> = (props) => {
  const { sdk } = props;
  const { t } = useLang();
  const { bubble, chat } = sdk.variables;

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.FontSizeConfigs,
      'cssVariables'
    ),
    ...getVariableConfigs(
      chat.FontSizeConfigs,
      'chatCssVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title={t('theme.Text font')}
      desc={t('theme.Set text size, such as bubble title text, welcome message, etc')}
    >
      <div className={styles.container}>
        {configs.map(item => {
          return (
            <ProFormItem
              key={item.variable}
              label={item.label}
              name={item.name}
            >
              <SliderInput {...item.formItemConfigs} />
            </ProFormItem>
          );
        })}
      </div>
    </CustomCollapse>
  );
}

export default ThemeFont;