import { type FC } from 'react';
import { Tabs } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import SpinBox from '@/components/SpinBox';
import { SettingType } from './enum';
import { useAiSdk } from './hooks';
import Appearance from './appearance';
import Component from './component';
import styles from './styles.module.less';

const Preview: FC = () => {
  const { targetRef, updateChatMode, sdk } = useAiSdk();
  const [activeKey, setActiveKey] = useSafeState(SettingType.NORMAL);

  const handleTabChange = useMemoizedFn((tabKey) => {
    setActiveKey(tabKey);
    updateChatMode(tabKey === SettingType.NORMAL ? 'bubble' : 'window');
  });

  return (
    <PageContainer
      title="Theme Editor"
      className="shopify full-screen"
    >
      <SpinBox>
        <div className={styles.container}>
          <div className={styles.form}>
            {!!sdk && (
              <Tabs
                activeKey={activeKey}
                className={styles.tabs}
                onChange={handleTabChange}
                items={[
                  {
                    key: SettingType.NORMAL,
                    label: 'Appearance Settings',
                    children: <Appearance sdk={sdk} updateChatMode={updateChatMode}/>
                  },
                  {
                    key: SettingType.COMPONENTS,
                    label: 'Component Settings',
                    children: <Component sdk={sdk} />
                  }
                ]}
              />
            )}
          </div>
          <div
            ref={targetRef}
            className={styles.window}
          />
        </div>
      </SpinBox>
    </PageContainer>
  );
}

export default Preview;