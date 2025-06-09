import type { FC } from 'react';
import { Card, Table } from 'antd';
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
          <Table
            showHeader={false}
            dataSource={rows}
            scroll={{ y: 283 }}
            pagination={false}
            className="shopify-no-header"
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