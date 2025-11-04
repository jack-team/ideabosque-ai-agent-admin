import { type FC, useRef } from 'react';
import { Space, Tag, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { TriggerModal } from '@/components';
import { ProTable, type ActionType } from '@ant-design/pro-components';
import { queryAgentWorkflowsApi, deleteFlowSnippetApi } from '@/services/workflow';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon, DuplicateIcon } from '@shopify/polaris-icons';
import VersionForm from '../VersionForm';
import { formatDate } from '@/utils';
import { StatusEnum } from '@/constants/enum';

type WorkflowsProps = {
  onEdit?: (record: API.Workflow.FlowSnippet, type: string) => void;
};

const Workflows: FC<WorkflowsProps> = (props) => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const deleteRow = useMemoizedFn(async (record: API.Workflow.FlowSnippet) => {
    modal.confirm({
      rootClassName: 'shopify',
      okButtonProps: { className: 'shopify', danger: true },
      cancelButtonProps: { className: 'shopify gray' },
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
      pagination={{ pageSize: 5 }}
      request={async () => {
        const {
          flowSnippetList: result
        } = await queryAgentWorkflowsApi({
          pageNumber: 1,
          limit: 100,
          statuses: [StatusEnum.Active]
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
          width: '120px',
          render: (_, record) => {
            return (
              <Space>
                <IconButton
                  icon={EditIcon}
                  onClick={() => props.onEdit?.(record, 'edit')}
                />
                <TriggerModal
                  width={400}
                  title="Versions"
                  destroyOnHidden
                  okText="Apply"
                  trigger={<IconButton icon={DuplicateIcon}/>}
                >
                  <VersionForm formData={record} />
                </TriggerModal>
                <IconButton
                  icon={DeleteIcon}
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