import { type FC } from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useMemoizedFn, useSafeState } from 'ahooks';
import PageContainer from '@/components/PageContainer';
import { ProForm } from '@ant-design/pro-components';
import { useLeavePage } from '@/hooks/useLeavePage';
import { useConfirm } from '@/hooks/useConfirm';
import SpinBox from '@/components/SpinBox';
import ShopifyButton from '@/components/Button';
import { SettingType } from './enum';
import { useAgentSdk } from './hooks';
import Appearance from './appearance';
import Preview from './preview';
import styles from './styles.module.less';

const ThemeEditor: FC = () => {
  const [confirm] = useConfirm();
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

  useLeavePage((blocker) => {
    confirm({
      okText: 'Yes',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      onConfirm: () => blocker.proceed()
    });
  });

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
      <SpinBox loading={!agentSdk}>
        <div className={styles.container}>
          <div className={
            classNames(styles.content, {
              [styles.hide]: !agentSdk
            })}
          >
            <div className={styles.form}>
              {agentSdk ? (
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
                    }
                  ]}
                />
              ) : null}
            </div>
            <Preview
              sdk={agentSdk}
              ref={targetRef}
              appearanceForm={appearanceForm}
            />
          </div>
        </div>
      </SpinBox>
    </PageContainer>
  );
}

export default ThemeEditor;