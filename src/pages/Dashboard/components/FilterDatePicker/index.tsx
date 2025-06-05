import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { Grid, DataTable, Scrollable, Text, Card, DatePicker } from '@shopify/polaris';

const FilterDatePicker: FC = () => {
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    [],
  );

  return (
    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 3 }}>
      <Card>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
        />
      </Card>
    </Grid.Cell>
  );
}

export default FilterDatePicker;