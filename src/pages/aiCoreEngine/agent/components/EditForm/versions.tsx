import { type FC } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Switch, Popconfirm, message, Button } from 'antd';
import { useSafeState, useMemoizedFn, useMount } from 'ahooks';
import {
  getAgentListApi,
  insertUpdateAgentApi
} from '@/services/agent';

type DataViewsProps = {
  agentUuid: string;
}

const DataViews: FC<DataViewsProps> = (props) => {
  const [statusLoading, setStatusLoading] = useSafeState(false);

  const fetchDatas = useMemoizedFn(async () => {
    const {
      agentList: result
    } = await getAgentListApi({
      limit: 5,
      pageNumber: 1,
      agentUuid: props.agentUuid
    });
    return {
      total: result.total,
      data: result.agentList
    }
  });

  const onDelete = useMemoizedFn(async (record: any) => {
    const dataSource = record.documentSource.data_source_name;
    try {
      message.success('Deleted successfully.');
    } catch (err) {
      message.error('Deleted failed.');
    }
  });

  useMount(fetchDatas);

  return (
    <ProTable
      rowKey="agentVersionUuid"
      search={false}
      toolBarRender={false}
      request={fetchDatas}
      className="shopify"
      columns={[
        {
          dataIndex: 'agentVersionUuid',
          title: 'Agent Version Uuid'
        },
        {
          dataIndex: 'status',
          title: 'Status',
          render: (_, record, __, inatnce) => {
            const total = inatnce?.pageInfo?.total || 0;
            const checked = record.status === 'active';
            const disabled = checked && total <= 1;
            return (
              <Switch
                checked={checked}
                disabled={disabled}
                loading={statusLoading}
                onChange={async (checked) => {
                  setStatusLoading(true);
                  try {
                    await insertUpdateAgentApi({
                      updatedBy: record.updatedBy,
                      agentUuid: record.agentUuid,
                      agentVersionUuid: record.agentVersionUuid,
                      status: checked ? 'active' : 'inactive'
                    });
                    inatnce?.reload();
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setStatusLoading(false);
                  }
                }}
              />
            );
          }
        },
        {
          width: 70,
          dataIndex: 'action',
          title: 'Action',
          render: (_, record) => {
            return (
              <Popconfirm
                okText="Delete"
                okType="danger"
                title="Are you sure you want to delete this version?"
                onConfirm={() => onDelete(record)}
              >
                <Button
                  danger
                  type="link"
                  disabled={record.status === 'active'}
                >
                  Delete
                </Button>
              </Popconfirm>
            )
          }
        }
      ]}
    />
  );
}

export default DataViews;