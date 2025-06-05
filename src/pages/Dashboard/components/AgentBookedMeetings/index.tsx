import type { FC } from 'react';
import { Grid, DataTable, Scrollable, Text, Link } from '@shopify/polaris';
import ProCard from '@/components/ProCard';
import styles from './styles.module.less';

const rows = Array.from({ length: 20 }).map(() => {
  return [
    <Text as="strong">Vertex Solutions</Text>,
    'Monday, May 12 · 6:00 - 6:30pm',
    <span>Call link: <Link>https://meet.google.com/fgt-oitd-qqr</Link></span>
  ];
});

const AgentBookedMeetings: FC = () => {
  return (
    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 9 }}>
      <ProCard
        hasTitleUnderLine
        title="Agent booked meetings"
      >
        <Scrollable className={styles.scroller}>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text'
            ]}
            rows={rows}
            headings={[]}
          />
        </Scrollable>
      </ProCard>
    </Grid.Cell>
  );
}

export default AgentBookedMeetings;