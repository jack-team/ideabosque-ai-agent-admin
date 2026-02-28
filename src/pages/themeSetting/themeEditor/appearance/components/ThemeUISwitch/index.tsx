import { type FC, useMemo, memo } from 'react';
import { ProFormSwitch } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeUISwitchProps = {
  sdk: AgentSdkInstance;
}

const ThemeUISwitch: FC<ThemeUISwitchProps> = (props) => {
  const { sdk } = props;
  const { t } = useLang();
  const { bubble, chat } = sdk.variables;

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      chat.chatBase.UiSwitchConfigs,
      'chatUiVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title={t('theme.UI switch')}
      desc={t('theme.Show or hide some UI elements')}
    >
      <div className={styles.container}>
        {configs.map(item => {
          return (
            <ProFormSwitch
              key={item.variable}
              label={item.label}
              name={item.name}
            />
          );
        })}
      </div>
    </CustomCollapse>
  );
}

export default memo(ThemeUISwitch);