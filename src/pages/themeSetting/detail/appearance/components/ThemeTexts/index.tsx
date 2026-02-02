import { type FC, useMemo, memo } from 'react';
import { ProFormTextArea } from '@ant-design/pro-components';
import { getVariableConfigs } from '../../../helper';
import CustomCollapse from '../CustomCollapse';
import styles from './styles.module.less';

type ThemeTextsProps = {
  sdk: AgentSdkInstance;
}

const ThemeTexts: FC<ThemeTextsProps> = (props) => {
  const { sdk } = props;
  const { bubble, chat } = sdk.variables;

  const configs = useMemo(() => ([
    ...getVariableConfigs(
      bubble.TextConfigs,
      'uiVariables'
    ),
    ...getVariableConfigs(
      chat.TextConfigs,
      'chatUiVariables'
    )
  ]), [bubble, chat]);

  return (
    <CustomCollapse
      title="Text content"
      desc="Set text content, such as bubble titles, AI assistant names, etc."
    >
      <div className={styles.container}>
        {configs.map(item => {
          return (
            <ProFormTextArea
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

export default memo(ThemeTexts);