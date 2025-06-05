import type { FC } from 'react';
import { Page, Button, Grid } from '@shopify/polaris';
import Workflows from './components/Workflows';
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
      <div className={styles.templates}>
        <ProCard title="Featured templates">
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <ProCard title="Onboarding customers">
                <p>Collects basic information, line name, email, phone, company size as ell as allowing for documents to be uploaded. After the info is collected the agent sets up a meeting via Google or Hubspot calendar integration.</p>
              </ProCard>
            </Grid.Cell>
             <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <ProCard title="Sales">
                <p>Targeted towards new customers that haven’t purchased any products yet. Offerers a customizable promotional offer to incentivize the user to make their first purchase.</p>
              </ProCard>
            </Grid.Cell>
             <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <ProCard title="Sales">
                <p>Use this workflow to ask a series of questions to help create a custom order for a customer. This will gather the necessary details to create the quote or send to a team member who can follow up with a custom quote.</p>
              </ProCard>
            </Grid.Cell>
          </Grid>
        </ProCard>
      </div>
    </Page>
  );
}

export default AgentWorkflows;