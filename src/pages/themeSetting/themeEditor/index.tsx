import { forwardRef, useImperativeHandle, useMemo } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SpinBox from '@/components/SpinBox';
import { ProForm } from '@ant-design/pro-components';
import { useLeavePage } from '@/hooks/useLeavePage';
import { useConfirm } from '@/hooks/useConfirm';
import { useAiSdk } from '@/hooks/useAiSdk';
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
  const [confirm] = useConfirm();
  const [actionForm] = ProForm.useForm<ActionFormData>();
  const [baseForm] = ProForm.useForm<BaseFormDataType>();

  const defaultTheme = useMemo(() => {
    const { openMode = 'window', position = 'bottomRight', ...rest } = themeData;
    return { ...rest, openMode, position };
  }, [themeData]);

  // 初始化 Sdk
  const { sdk, target } = useAiSdk({
    openMode: defaultTheme.openMode,
    position: defaultTheme.position
  });

  useLeavePage((blocker) => {
    confirm({
      okText: 'Yes',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      onConfirm: () => blocker.proceed()
    });
  });

  const getThemeData = useMemoizedFn(() => ({
    components: {},
    basic: baseForm.getFieldsValue(true),
    ...actionForm.getFieldsValue(true)
  }));

  useImperativeHandle(ref, () => {
    return { getThemeData };
  });

  const contentClassName = classNames(
    styles.content,
    { [styles.hide]: !sdk }
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