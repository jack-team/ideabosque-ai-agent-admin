import type { FC } from 'react';
import { Grid } from '@shopify/polaris';
import ProCard from '@/components/ProCard';
import styles from './styles.module.less';
// icons
import chart1Img from '@/assets/chart_1@2x.png';
import chart2Img from '@/assets/chart_2@2x.png';
import chart3Img from '@/assets/chart_3@2x.png';

const Statistics: FC = () => {

  const items = [
    {
      title: 'Open Quotes',
      value: '$158,068.54',
      icon: {
        height: 19,
        src: chart1Img
      }
    },
    {
      title: 'New buyers approved',
      value: '328',
      icon: {
        height: 14,
        src: chart2Img
      }
    },
    {
      title: 'Tokens Used',
      value: '30,675',
      icon: {
        height: 19,
        src: chart3Img
      }
    },
    {
      title: 'Agent fulfilled orders',
      value: '314'
    }
  ];

  return (
    <Grid>
      {items.map((item, i) => {
        let extra = null;

        if (item.icon) {
          extra = (
            <div className={styles.icon}>
              <img {...item.icon} />
            </div>
          );
        }

        return (
          <Grid.Cell
            key={`key_${i}`}
            columnSpan={{ xs: 3, lg: 3 }}
          >
            <ProCard
              extra={extra}
              title={item.title}
              subTitle={item.value}
              hasTitleUnderLine
            />
          </Grid.Cell>
        );
      })}
    </Grid>
  );
}

export default Statistics;