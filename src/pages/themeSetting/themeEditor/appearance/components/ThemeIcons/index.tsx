import { type FC, useMemo, memo } from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import UploadInput from '@/components/UploadInput';
import { useLang } from '@/hooks/useLang';
import { getVariableConfigs } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeIconsProps = {
  sdk: AgentSdkInstance;
}

const ThemeIcons: FC<ThemeIconsProps> = (props) => {
  const { sdk } = props;
  const { t } = useLang();
  const { bubble, chat } = sdk.variables;

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.IconConfigs,
      'uiVariables'
    ),
    ...getVariableConfigs(
      chat.chatBase.IconConfigs,
      'chatUiVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title={t('theme.Icons')}
      desc={t('theme.Upload icon image')}
    >
      <div className={styles.container}>
        {configs.map(item => {
          return (
            <ProFormItem
              key={item.variable}
              name={item.name}
              label={item.label}
            >
              <UploadInput namespace="sdk-icons" reviewImg />
            </ProFormItem>
          );
        })}
      </div>
    </CustomCollapse>
  );
}

export default memo(ThemeIcons);