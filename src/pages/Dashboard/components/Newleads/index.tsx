import type { FC } from 'react';
import { Grid, TextField, DataTable, Text, Scrollable } from '@shopify/polaris';
import ProCard from '@/components/ProCard';
import styles from './styles.module.less';

const rows = Array.from({ length: 20 }).map(() => {
  return ['Vertex Solutions', 'tyler@vertexsolutions.com', '$5000'];
});

const Newleads: FC = () => {
  return (
    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 5 }}>
      <ProCard title="New leads">
        <div className={styles.container}>
          <TextField
            label=""
            placeholder="Search"
            autoComplete="off"
          />
          <Scrollable className={styles.scroller}>
            <DataTable
              columnContentTypes={[
                'text',
                'text',
                'text'
              ]}
              headings={[
                <Text as="strong">Company</Text>,
                <Text as="strong">Contact email</Text>,
                <Text as="strong">Quote</Text>,
              ]}
              rows={rows}
            />
          </Scrollable>
        </div>
      </ProCard>
    </Grid.Cell>
  );
}

export default Newleads;