import type { FC } from 'react';
import { useEffect } from 'react';
import { TriggerModal } from '@/components';
import styles from './styles.module.less';
import headerImg from './header@2x.png';
import ConnectLlm from '../ConnectLlm';
import { useModal } from '@/components/TriggerModal/hooks';

const WelcomeContent: FC<any> = (props) => {
  const [modal] = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={headerImg} />
      </div>
      <div className={styles.content}>
        <div className={styles.desc}>
          To get started with your AI chat agent, we need to complete a few essential steps to ensure everything is connected and ready for deployment on your Shopify site. Here’s what you can expect during the setup process:
        </div>
        <div className={styles.tables}>
          <div className={styles.table_row}>
            <div className={styles.table_title}>
              <div className={styles.step}>Step 1: </div>
              Connect your LLM
            </div>
            <div className={styles.table_text}>
              {`Begin by linking your agent to a Language Learning Model (LLM). You can do this by entering an existing `}
              <TriggerModal
                modal={modal}
                showCancel={false}
                title="Connect your LLM"
                okText="Connect LLM"
                trigger={<strong>LLM API Key</strong>}
                onOpen={props.onClose}
                onClose={props.onOpen}
              >
                <ConnectLlm />
              </TriggerModal>
              {` or by creating a new key through our service.`}
            </div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_title}>
              <div className={styles.step}>Step 2: </div>
              Define a Customer Group
            </div>
            <div className={styles.table_text}>
              Customer Groups help tailor the agent’s responses based on user types. For example, you might create an "Onboarding Group" for new users and a "Sales Group" for returning customers already familiar with your brand.
            </div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_title}>
              <div className={styles.step}>Step 3: </div>
              Create a Workflow
            </div>
            <div className={styles.table_text}>
              Workflows outline the tasks your agent will perform to achieve specific goals. Consider them as a sequence of questions designed to gather necessary information. The agent will facilitate these questions to gather the required information efficiently. <strong>Ready to begin</strong>?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;