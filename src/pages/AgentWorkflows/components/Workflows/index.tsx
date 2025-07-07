import type { FC } from 'react';
import { Space, Tag } from 'antd';
import { useNavigate } from 'react-router';
import { ShopifyButton } from '@/components';
import { ProTable } from '@ant-design/pro-components';
import { queryAgentWorkflows } from '@/services/agent-workflow';

const Workflows: FC = () => {
  const navigate = useNavigate();

  return (
    <ProTable<API.Workflow.FlowSnippet>
      className="shopify"
      options={false}
      search={false}
      pagination={{
        pageSize: 10
      }}
      request={async () => {
        const {
          flowSnippetList: result
        } = await queryAgentWorkflows({
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
          dataIndex: 'createdAt'
        },
        {
          title: 'Update at',
          dataIndex: 'updatedAt'
        },
        {
          key: 'action',
          title: 'Action',
          width: '120px',
          render: (_, record) => {
            return (
              <Space>
                <ShopifyButton
                  size="small"
                  type="primary"
                  onClick={() => {
                    const { flowSnippetUuid: uid, flowSnippetVersionUuid: vid } = record;
                    navigate(`/agent-workflows/detail/${uid}/${vid}`);
                  }}
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