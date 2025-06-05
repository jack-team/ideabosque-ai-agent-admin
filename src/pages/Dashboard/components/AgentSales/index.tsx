import type { FC } from 'react';
import { Grid } from '@shopify/polaris';
import type { EChartsOption } from 'echarts';
import ProCard from '@/components/ProCard';
import ReactECharts from 'echarts-for-react';
import styles from './styles.module.less';

var option: EChartsOption = {
  grid: {
    left: 0,
    right: 0,
    top: 16,
    bottom: 16,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  xAxis: {
    type: 'category',
    data: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12', '5/13'],
    axisLine: {
      lineStyle: {
        color: '#53D4FF',
        type: 'dashed'
      }
    },
    axisLabel: {
      color: '#8A8A8A',
      fontSize: 11
    }
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 1000,
      interval: 500,
      position: 'left',
      axisLabel: {
        formatter: '${value}',
        color: '#8A8A8A',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: '#53D4FF'
        }
      }
    }
  ],
  series: [
    {
      type: 'line',
      name: '销量',
      data: [100, 200, 500, 400, 500, 500, 700, 600, 700, 700, 1000, 1000, 900, 1000], // 假设的数据，根据图表大概估算
      lineStyle: {
        color: '#53D4FF'
      },
      itemStyle: {
        color: '#53D4FF',
      },
      smooth: false
    },
  ]
};

const AgentSales: FC = () => {
  return (
    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 7 }}>
      <ProCard
        title="Agent attributed sales"
        subTitle="$528,032.82"
      >
        <div className={styles.container}>
          <ReactECharts option={option} style={{ height: 233 }} />
        </div>
      </ProCard>
    </Grid.Cell>
  );
}

export default AgentSales;