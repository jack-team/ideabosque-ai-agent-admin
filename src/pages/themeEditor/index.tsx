import { type FC } from 'react';
import classNames from 'classnames';
import PageContainer from '@/components/PageContainer';
import { ProForm } from '@ant-design/pro-components';
import { useLeavePage } from '@/hooks/useLeavePage';
import { useConfirm } from '@/hooks/useConfirm';
import SpinBox from '@/components/SpinBox';
import ShopifyButton from '@/components/Button';
import { useAiSdk } from '@/hooks/useAiSdk';
import Preview from './preview';
import styles from './styles.module.less';

type FormDataType = {
  openMode: OpenModeType;
  position: BubblePositionType;
}

const ThemeEditor: FC = () => {
  const [confirm] = useConfirm();
  const [baseForm] = ProForm.useForm<FormDataType>();

  const { sdk, target } = useAiSdk({
    clientId: 'xxx',
    openMode: 'window',
    enableEditTheme: true,
  });

  useLeavePage((blocker) => {
    confirm({
      okText: 'Yes',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      onConfirm: () => blocker.proceed()
    });
  });

  const contentClassName = classNames(
    styles.content,
    !sdk && styles.hide
  );

  return (
    <PageContainer
      fullScreen
      title="Theme Editor"
      extra={
        <ShopifyButton type="primary">
          Save
        </ShopifyButton>
      }
    >
      <div className={styles.container}>
        <SpinBox loading={!sdk} alpha={0}>
          <div className={contentClassName}>
            <Preview
              sdk={sdk}
              ref={target}
              baseForm={baseForm}
            />
          </div>
        </SpinBox>
      </div>
    </PageContainer>
  );
}

export default ThemeEditor;