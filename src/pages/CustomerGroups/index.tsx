import type { FC } from 'react';
import { Page, Button } from '@shopify/polaris';

const CustomerGroups: FC = () => {
  return (
    <Page
      fullWidth
      title="Customer Groups"
      primaryAction={
        <Button variant="primary">
          Add Customer Group
        </Button>
      }
    >
      CustomerGroups
    </Page>
  );
}

export default CustomerGroups;