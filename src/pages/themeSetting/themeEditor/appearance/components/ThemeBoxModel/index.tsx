import { type FC, useMemo } from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs } from '../../../helper';
import SliderInput from '../SliderInput';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeBoxModelProps = {
  sdk: AgentSdkInstance;
}

const ThemeBoxModel: FC<ThemeBoxModelProps> = (props) => {
  const { sdk } = props;
  const { t } = useLang();
  const { bubble, chat } = sdk.variables;

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.BoxModelConfigs,
      'cssVariables'
    ),
    ...getVariableConfigs(
      chat.BoxModelConfigs,
      'chatCssVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title={t('theme.Box Model')}
      desc={t('theme.Set the box model, such as container size, padding, margin, etc')}
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

export default ThemeBoxModel;