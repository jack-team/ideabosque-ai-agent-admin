import { type FC, useMemo, memo } from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import UploadInput from '@/components/UploadInput';
import { getVariableConfigs } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeIconsProps = {
  sdk: AgentSdkInstance;
}

const ThemeIcons: FC<ThemeIconsProps> = (props) => {
  const { sdk } = props;
  const { bubble, chat } = sdk.variables;


  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.IconConfigs,
      'uiVariables'
    ),
    ...getVariableConfigs(
      chat.IconConfigs,
      'chatUiVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title="Icons"
      desc="Upload icon image"
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