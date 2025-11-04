import type { FC } from 'react';
import { Calendar, Card, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

const CalendarFilter: FC = () => {
  return (
    <Card className="shopify">
      <div className={styles.container}>
        <Calendar
          fullscreen={false}
          className={styles.calendar}
          headerRender={(e) => {
            const date = e.value;

            const onPrev = () => {
              e.onChange(date.subtract(1, 'month'));
            }

            const onNext = () => {
              e.onChange(date.add(1, 'month'));
            }

            return (
              <div className={styles.header}>
                <Button
                  type="text"
                  size="small"
                  onClick={onPrev}
                >
                  <ArrowLeftOutlined />
                </Button>
                <div className={styles.shower}>
                  {date.format('MMM YYYY')}
                </div>
                <Button
                  type="text"
                  size="small"
                  onClick={onNext}
                >
                  <ArrowRightOutlined />
                </Button>
              </div>
            );
          }}
        />
      </div>
    </Card>
  );
}

export default CalendarFilter;