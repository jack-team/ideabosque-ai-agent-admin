import { type FC, useRef } from 'react';
import { Alert, Space, Button } from 'antd';
import { InfoIcon, XIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import { withIcon } from '@/components/IconButton';
import { useLang } from '@/hooks/useLang';
import AgentList from './agentList';
import CoordinationList from './coordinationList';
import styles from './styles.module.less';

const WInfo = withIcon(InfoIcon);
const WXIcon = withIcon(XIcon);

const Agent: FC = () => {
  const { t } = useLang();
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  return (
    <PageContainer
      title={t('agent.agents')}
      extra={
        <Space>
          <Button
            className="gray-mode"
            onClick={() => aRef.current?.click()}
          >
            {t('agent.addCoordination')}
          </Button>
          <Button
            type="primary"
            onClick={() => bRef.current?.click()}
          >
            {t('agent.addAgent')}
          </Button>
        </Space>
      }
    >
      <Alert
        showIcon
        icon={<WInfo />}
        closable={{
          closeIcon: (
            <div className={styles.close_btn}>
              <WXIcon />
            </div>
          )
        }}
        className={styles.alert}
        title={t('agent.Setting up Agents')}
        description={t('agent.Setting up Agents desc')}
      />
      <CoordinationList addRef={aRef} />
      <AgentList addRef={bRef} />
    </PageContainer>
  );
}

export default Agent;