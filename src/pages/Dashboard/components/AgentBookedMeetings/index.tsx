import type { FC } from 'react';
import { Card } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import styles from './styles.module.less';

const rows = Array.from({ length: 20 }).map((_, i) => {
  return {
    id: `id_${i}`,
    userName: 'Nexus & Co.',
    date: 'Monday, May 12 · 6:00 – 6:30pm',
    link: 'https://meet.google.com/fgt-oitd-qqr'
  };
});

const AgentBookedMeetings: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Card title="Agent booked meetings" className="shopify">
        <div className={styles.container}>
          <ProTable
            showHeader={false}
            dataSource={rows}
            scroll={{ y: 282 }}
            pagination={false}
            search={false}
            toolBarRender={false}
            className="shopify simple-table"
            columns={[
              {
                dataIndex: 'userName',
                render: (text) => {
                  return <strong>{text}</strong>
                }
              },
              {
                dataIndex: 'date'
              },
              {
                dataIndex: 'link',
                render: (text) => {
                  return <>Call link: <a>{text}</a></>;
                }
              }
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

export default AgentBookedMeetings;