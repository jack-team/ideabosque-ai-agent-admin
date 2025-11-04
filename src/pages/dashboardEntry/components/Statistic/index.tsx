import type { FC } from 'react';
import { Card, Row, Col } from 'antd';
import styles from './styles.module.less';
import img1 from '@/assets/chart_1@2x.png';
import img2 from '@/assets/chart_2@2x.png';
import img3 from '@/assets/chart_3@2x.png';

const items = [
  {
    title: 'Open Quotes',
    value: '$158,068.54',
    icon: {
      src: img1,
      height: 19
    }
  },
  {
    title: 'New buyers approved',
    value: '328',
    icon: {
      src: img2,
      height: 14
    }
  },
  {
    title: 'Tokens Used',
    value: '30,675',
    icon: {
      src: img3,
      height: 19
    }
  },
  {
    title: 'Agent fulfilled orders',
    value: '314'
  }
];

const Statistic: FC = () => {
  return (
    <Row gutter={24}>
      {items.map((item, i) => {
        return (
          <Col
            xl={6}
            sm={12}
            xs={24}
            lg={6}
            key={i}
            className={styles.item}
          >
            <Card title={item.title} className="shopify">
              <div className={styles.content}>
                <div className={styles.value}>
                  {item.value}
                </div>
                {!!item.icon && (
                  <img
                    {...item.icon}
                    className={styles.icon}
                  />
                )}
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Statistic;