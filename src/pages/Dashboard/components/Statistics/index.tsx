import type { FC } from 'react';
import ProCard from '@/components/ProCard';
import { Grid } from '@shopify/polaris';
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
        src: chart1Img,
        height: 19
      }
    },
    {
      title: 'New buyers approved',
      value: '328',
      icon: {
        src: chart2Img,
        height: 14
      }
    },
    {
      title: 'Tokens Used',
      value: '30,675',
      icon: {
        src: chart3Img,
        height: 19
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
        return (
          <Grid.Cell
            key={`key_${i}`}
            columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3 }}
          >
            <ProCard
              title={item.title}
              subTitle={item.value}
              ext={!!item.icon &&
                <div className={styles.icon_wrapper}>
                  <img {...item.icon} />
                </div>
              }
            />
          </Grid.Cell>
        );
      })}
    </Grid>
  );
}

export default Statistics;