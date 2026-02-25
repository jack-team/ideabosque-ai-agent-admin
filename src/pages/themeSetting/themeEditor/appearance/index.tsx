import { type FC, memo, useMemo } from 'react';
import { useMemoizedFn, useMount } from 'ahooks';
import { ProForm, type FormInstance } from '@ant-design/pro-components';
import ThemeColors from './components/ThemeColors';
import ThemeIcons from './components/ThemeIcons';
import ThemeTexts from './components/ThemeTexts';
import ThemeFont from './components/ThemeFont';
import ThemeBoxModel from './components/ThemeBoxModel';
import { pathToObj } from '@/utils';
import styles from './styles.module.less';

type AppearanceProps = {
  sdk: AgentSdkInstance;
  form: FormInstance;
  resetDefaults: () => void;
  defaultBasicTheme?: Record<string, any>;
  getDefaultTheme: () => Record<string, any>;
}

const Appearance: FC<AppearanceProps> = (props) => {
  const {
    sdk,
    form,
    defaultBasicTheme,
    getDefaultTheme
  } = props;

  const initialValues = useMemo(() => {
    return defaultBasicTheme ?
      defaultBasicTheme :
      getDefaultTheme();
  }, [defaultBasicTheme]);

  // 表单字段变换
  const onFieldsChange = useMemoizedFn((items: any[]) => {
    for (const item of items) {
      const obj = pathToObj(item.name, item.value);
      sdk.updateThemeConfigs(obj);
    }
  });

  useMount(() => {
    // 同步主题到 SDK
    sdk.updateThemeConfigs(initialValues);
  });

  return (
    <div className={styles.container}>
      <ProForm
        form={form}
        submitter={false}
        className={styles.content}
        initialValues={initialValues}
        onFieldsChange={onFieldsChange}
      >
        <ThemeColors
          sdk={sdk}
          form={form}
          resetDefaults={props.resetDefaults}
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