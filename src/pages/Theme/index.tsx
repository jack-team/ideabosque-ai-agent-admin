import { type FC } from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { PageContainer, ProForm } from '@ant-design/pro-components';
import SpinBox from '@/components/SpinBox';
import { ShopifyButton } from '@/components';
import { SettingType } from './enum';
import { useAgentSdk } from './hooks';
import Appearance from './appearance';
// import Component from './component';
import Preview from './preview';
import styles from './styles.module.less';

const ThemeEditor: FC = () => {
  const { agentSdk, targetRef } = useAgentSdk();
  const [appearanceForm] = ProForm.useForm();
  const [activeKey, setActiveKey] = useSafeState(SettingType.NORMAL);

  const handleTabChange = useMemoizedFn((tabKey) => {
    setActiveKey(tabKey);
    agentSdk?.setOpenMode(
      tabKey === SettingType.NORMAL ?
        'bubble' :
        'window'
    );
  });

  return (
    <PageContainer
      title="Theme Editor"
      className="shopify full-screen"
      extra={
        <ShopifyButton type="primary">
          Save
        </ShopifyButton>
      }
    >
      <SpinBox loading={!agentSdk}>
        <div className={classNames(styles.container, !!agentSdk && styles.show)}>
          <div className={styles.form}>
            {!!agentSdk && (
              <Tabs
                activeKey={activeKey}
                className={styles.tabs}
                onChange={handleTabChange}
                renderTabBar={() => <span />}
                items={[
                  {
                    key: SettingType.NORMAL,
                    label: 'Appearance Settings',
                    children: (
                      <Appearance
                        sdk={agentSdk}
                        form={appearanceForm}
                      />
                    )
                  },
                  // {
                  //   key: SettingType.COMPONENTS,
                  //   label: 'Component Settings',
                  //   children: <Component sdk={agentSdk} />
                  // }
                ]}
              />
            )}
          </div>
          <Preview
            sdk={agentSdk}
            ref={targetRef}
            appearanceForm={appearanceForm}
          />
        </div>
      </SpinBox>
    </PageContainer>
  );
}

export default ThemeEditor;