import type { FC, Key } from 'react';
import { useSafeState } from 'ahooks';
import { Tag } from 'antd';
import { ProTable } from '@ant-design/pro-components';

const datas = Array.from({ length: 20 }).map((_, i) => {
  return {
    id: `id_${i}`,
    name: 'New business buyer onboarding',
    groups: 'Customer group all',
    lastRun: '5/15/2025',
    status: 'Active'
  }
})

const Workflows: FC = () => {
  const [
    activeKey,
    setActiveKey
  ] = useSafeState<Key>('tab1');

  return (
    <ProTable
      search={false}
      className="shopify"
      options={{
        density: false,
        setting: false,
        search: true
      }}
      dataSource={datas}
      pagination={{
        pageSize: 6
      }}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: activeKey,
          onChange: (val) => setActiveKey(val!),
          items: [
            {
              key: 'tab1',
              label: 'All',
            },
            {
              key: 'tab2',
              label: 'Active',
            },
            {
              key: 'tab3',
              label: 'Inactive'
            }
          ],
        }
      }}
      columns={[
        {
          title: 'Workflow',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: 'Customer groups',
          dataIndex: 'groups'
        },
        {
          title: 'Last run',
          dataIndex: 'lastRun'
        },
        {
          width: '100px',
          title: 'Status',
          dataIndex: 'status',
          render: (text) => {
            return (
              <Tag
                className="shopify"
                color="#CDFEE1"
                style={{ color: '#0C5132' }}
              >
                {text}
              </Tag>
            )
          }
        }
      ]}
    />
  )
}

export default Workflows;