import type { FC } from 'react';
import { Card, Input, Table } from 'antd';
import styles from './styles.module.less';

const rows = Array.from({ length: 20 }).map((_, i) => {
  return {
    id: `id_${i}`,
    company: 'Vertex Solutions',
    email: 'tyler@vertexsolutions.com',
    quote: '$5000'
  };
});

const Newleads: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Card title="New leads" className="shopify">
        <div className={styles.container}>
          <Input
            placeholder="Search"
            autoComplete="off"
            className="shopify"
          />
          <div className={styles.contet}>
            <Table
              dataSource={rows}
              scroll={{ y: 208 }}
              pagination={false}
              className="shopify-no-header"
              columns={[
                {
                  title: 'Company',
                  dataIndex: 'company',
                  render: (text) => {
                    return <a>{text}</a>
                  }
                },
                {
                  title: 'Contact email',
                  dataIndex: 'email'
                },
                {
                  width: 100,
                  title: 'Quote',
                  dataIndex: 'quote'
                }
              ]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Newleads;