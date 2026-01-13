import type { FC } from 'react';
import AgentList from './agentList';
import CoordinationList from './coordinationList';
import styles from './styles.module.less';

const Agent: FC = () => {
  return (
    <div className={styles.container}>
      <AgentList />
      <CoordinationList />
    </div>
  );
}

export default Agent;