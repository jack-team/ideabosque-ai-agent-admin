import { type ProFormColumnsType } from '@ant-design/pro-components';
import { ConnectionTypes } from '../../const';

type ColumnsType = ProFormColumnsType;

export const columns: ColumnsType[] = [
  {
    title: 'Connection setting',
    valueType: 'group',
    columns: [
      {
        title: 'Enable',
        valueType: 'switch',
        initialValue: true,
        dataIndex: 'connectionEnable'
      },
      {
        valueType: 'dependency',
        name: ['connectionEnable'],
        columns: ({ connectionEnable }) => {
          const columns: ColumnsType[] = [];
          if (connectionEnable) {
            columns.push({
              title: 'Types',
              valueType: 'select',
              valueEnum: ConnectionTypes,
              dataIndex: 'connectionTypes',
              fieldProps: { mode: 'multiple' },
              initialValue: Object.keys(ConnectionTypes)
            });
          }
          return columns;
        },
      }
    ]
  }
];