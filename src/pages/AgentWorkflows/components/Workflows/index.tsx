import type { FC } from 'react';
import dayjs from 'dayjs';
import { Space, Tag } from 'antd';
import { ShopifyButton } from '@/components';
import { ProTable } from '@ant-design/pro-components';
import { queryAgentWorkflowsApi } from '@/services/workflow';
import { formatDate } from '@/utils';

type WorkflowsProps = {
  onEdit?: (record: API.Workflow.FlowSnippet) => void;
};

const Workflows: FC<WorkflowsProps> = (props) => {
  return (
    <ProTable<API.Workflow.FlowSnippet>
      className="shopify"
      options={false}
      search={false}
      rowKey="flowSnippetUuid"
      pagination={{ pageSize: 10 }}
      request={async () => {
        const {
          flowSnippetList: result
        } = await queryAgentWorkflowsApi({
          pageNumber: 1,
          limit: 100
        })
        return {
          total: result.total,
          data: result.flowSnippetList
        }
      }}
      columns={[
        {
          title: 'Workflow',
          dataIndex: 'flowName',
          sorter: true
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (_, record) => {
            return <Tag color="">{record.status}</Tag>;
          }
        },
        {
          title: 'Create at',
          dataIndex: 'createdAt',
          render: (_, record) => formatDate(record.createdAt)
        },
        {
          title: 'Update at',
          dataIndex: 'updatedAt',
          render: (_, record) => formatDate(record.updatedAt)
        },
        {
          key: 'action',
          title: 'Action',
          width: '100px',
          render: (_, record) => {
            return (
              <Space>
                <ShopifyButton
                  size="small"
                  type="primary"
                  onClick={() => props.onEdit?.(record)}
                >
                  Edit
                </ShopifyButton>
              </Space>
            )
          }
        }
      ]}
    />
  )
}

export default Workflows;