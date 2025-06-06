import type { FC } from 'react';
import { Page, Button, Grid } from '@shopify/polaris';
import Workflows from './components/Workflows';
import FeaturedTemplates from './components/FeaturedTemplates';
import ProCard from '@/components/ProCard';
import styles from './styles.module.less';

const AgentWorkflows: FC = () => {
  return (
    <Page
      fullWidth
      title="Agent Workflows"
      primaryAction={
        <Button variant="primary">
          Add Customer Group
        </Button>
      }
    >
      <Workflows />
      <div className={styles.item}>
        <FeaturedTemplates />
      </div>
    </Page>
  );
}

export default AgentWorkflows;