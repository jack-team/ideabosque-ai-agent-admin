import { type FC, useRef } from 'react';
import { Space, Tag, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ShopifyButton } from '@/components';
import { ProTable, type ActionType } from '@ant-design/pro-components';
import { queryAgentWorkflowsApi, deleteFlowSnippetApi } from '@/services/workflow';
import { formatDate } from '@/utils';

type WorkflowsProps = {
  onEdit?: (record: API.Workflow.FlowSnippet) => void;
};

const Workflows: FC<WorkflowsProps> = (props) => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const deleteRow = useMemoizedFn(async (record: API.Workflow.FlowSnippet) => {
    modal.confirm({
      rootClassName: 'shopify',
      okButtonProps: { className: 'shopify' },
      cancelButtonProps: { className: 'shopify' },
      title: 'Are you sure you want to delete this record?',
      onOk: async () => {
        await deleteFlowSnippetApi(record);
        actionRef.current?.reload();
      }
    });
  });

  return (
    <ProTable<API.Workflow.FlowSnippet>
      className="shopify"
      options={false}
      search={false}
      actionRef={actionRef}
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
          dataIndex: 'flowName'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (_, record) => <Tag>{record.status}</Tag>
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
          width: '160px',
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
                <ShopifyButton
                  danger
                  size="small"
                  children="Delete"
                  onClick={() => deleteRow(record)}
                />
              </Space>
            )
          }
        }
      ]}
    />
  );
}

export default Workflows;