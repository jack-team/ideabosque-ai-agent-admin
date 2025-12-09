import { type FC, memo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { ProForm, type FormInstance } from '@ant-design/pro-components';
import { pathToObj } from '@/utils';
import ThemeColors from './components/ThemeColors';
import ThemeIcons from './components/ThemeIcons';
import ThemeTexts from './components/ThemeTexts';
import ThemeFont from './components/ThemeFont';
import ThemeBoxModel from './components/ThemeBoxModel';
import { getVariables, updateFormData } from '../helper';
import styles from './styles.module.less';

type AppearanceProps = {
  sdk: AgentSdkInstance;
  form: FormInstance;
}

const Appearance: FC<AppearanceProps> = (props) => {
  const { sdk, form } = props;
  const { chat, bubble } = sdk.variables;

  const setDefaultTheme = useMemoizedFn(() => {
    const defaultVariables = {
      uiVariables: getVariables(bubble.IconConfigs),
      chatUiVariables: getVariables(chat.IconConfigs),
      cssVariables: getVariables(bubble.ColorConfigs),
      chatCssVariables: getVariables(chat.ColorConfigs),
    }
    updateFormData(form, defaultVariables);
    sdk.updateThemeConfigs(defaultVariables);
  })

  // 表单字段变换
  const onFieldsChange = useMemoizedFn((items: any[]) => {
    for (const item of items) {
      const obj = pathToObj(item.name, item.value);
      sdk.updateThemeConfigs(obj);
    }
  });

  return (
    <div className={styles.container}>
      <ProForm
        form={form}
        submitter={false}
        className={styles.content}
        onFieldsChange={onFieldsChange}
        initialValues={{
          uiVariables: bubble.GlobalUiVariables,
          cssVariables: bubble.GlobalCssVariables,
          chatUiVariables: chat.GlobalUiVariables,
          chatCssVariables: chat.GlobalCssVariables
        }}
      >
        <ThemeColors
          sdk={sdk}
          form={form}
          setDefaultTheme={setDefaultTheme}
        />
        <ThemeIcons sdk={sdk} />
        <ThemeTexts sdk={sdk} />
        <ThemeFont sdk={sdk} />
        <ThemeBoxModel sdk={sdk} />
      </ProForm>
    </div>
  );
}

export default memo(Appearance);