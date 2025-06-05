import type { FC } from 'react';
import { useSafeState } from 'ahooks';
import { Page, Button, ButtonGroup, Grid } from '@shopify/polaris';
import Statistics from './components/Statistics';
import AgentSales from './components/AgentSales';
import Newleads from './components/Newleads';
import AgentBookedMeetings from './components/AgentBookedMeetings';
import FilterDatePicker from './components/FilterDatePicker';
import Welcome from './components/Welcome';
import styles from './styles.module.less';

const Dashboard: FC = () => {
  const [welcomeOpen, setWelcomeOpen] = useSafeState(true);
  return (
    <Page
      fullWidth
      title="Dashboard"
      primaryAction={
        <ButtonGroup>
          <Button variant="secondary">
            Add customer group
          </Button>
          <Button variant="primary">
            Create workflow
          </Button>
        </ButtonGroup>
      }
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <Statistics />
        </div>
        <div className={styles.row}>
          <Grid>
            <AgentSales />
            <Newleads />
          </Grid>
        </div>
        <div className={styles.row}>
          <Grid>
            <AgentBookedMeetings />
            <FilterDatePicker />
          </Grid>
        </div>
      </div>
      <Welcome
        open={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
      />
    </Page>
  );
}

export default Dashboard;