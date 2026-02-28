import { forwardRef, useImperativeHandle, useMemo } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SpinBox from '@/components/SpinBox';
import { ProForm } from '@ant-design/pro-components';
import { useLeavePage } from '@/hooks/useLeavePage';
import { useConfirm } from '@/hooks/useConfirm';
import { useAiSdk } from '@/hooks/useAiSdk';
import { useLang } from '@/hooks/useLang';
import Preview from './preview';
import type { ThemeEditorActionType, ThemeEditorProps } from './types';
import styles from './styles.module.less';

type BaseFormDataType = {
  openMode: OpenModeType;
  position: BubblePositionType;
}

type ActionFormData = {
  openMode: string;
  position: string;
}

const ThemeEditor = forwardRef<ThemeEditorActionType, ThemeEditorProps>((props, ref) => {
  const { themeData } = props;
  const { t } = useLang();
  const [confirm] = useConfirm();
  // 气泡模式和气泡位置表单
  const [actionForm] = ProForm.useForm<ActionFormData>();
  // 左侧表单
  const [baseForm] = ProForm.useForm<BaseFormDataType>();

  const defaultTheme = useMemo(() => {
    //增加打开模式和气泡位置的默认值
    const {
      openMode = 'window',
      position = 'bottomRight',
      ...rest
    } = themeData;

    return {
      ...rest,
      openMode,
      position
    };
  }, [themeData]);

  // 初始化 Sdk
  const { sdk, target } = useAiSdk({
    openMode: defaultTheme.openMode,
    position: defaultTheme.position
  });

  // 离开页面回调函数
  useLeavePage((blocker) => {
    confirm({
      okText: t('common.yes'),
      title: t('common.Are you sure you want to leave'),
      content: t('common.The data on this page will be lost after leaving'),
      onConfirm: () => blocker.proceed()
    });
  });

  // 或者 Theme 数据
  const getThemeData = useMemoizedFn(() => ({
    components: {},
    basic: baseForm.getFieldsValue(true),
    ...actionForm.getFieldsValue(true)
  }));

  useImperativeHandle(ref, () => ({ getThemeData }));

  const contentClassName = classNames(
    styles.content,{ [styles.hide]: !sdk }
  );

  return (
    <SpinBox loading={!sdk} alpha={0}>
      <div className={styles.container}>
        <div className={contentClassName}>
          <Preview
            sdk={sdk}
            ref={target}
            baseForm={baseForm}
            actionForm={actionForm}
            themeData={defaultTheme}
          />
        </div>
      </div>
    </SpinBox>
  );
});

export default ThemeEditor;