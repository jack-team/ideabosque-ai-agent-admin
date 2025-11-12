import { type FC, useRef } from 'react';
import { Tag, App, Dropdown } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { TriggerModal } from '@/components';
import IconButton, { withIcon } from '@/components/IconButton';
import { ProTable, type ActionType } from '@ant-design/pro-components';
import { queryAgentWorkflowsApi, deleteFlowSnippetApi } from '@/services/workflow';
import { EditIcon, DeleteIcon, DuplicateIcon, AlertCircleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import EditForm from '../EditForm';
import { formatDate } from '@/utils';
import { StatusEnum } from '@/constants/enum';

type WorkflowsProps = {
  onEdit?: (
    record: API.Workflow.FlowSnippet,
    type: string
  ) => void;
};

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WDuplicateIcon = withIcon(DuplicateIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const Workflows: FC<WorkflowsProps> = (props) => {
  const { onEdit } = props;
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const deleteRow = useMemoizedFn(async (record: API.Workflow.FlowSnippet) => {
    modal.confirm({
      rootClassName: 'shopify',
      okButtonProps: { className: 'shopify', danger: true },
      cancelButtonProps: { className: 'shopify gray' },
      title: 'Are you sure you want to delete this record?',
      onOk: async () => {
        await deleteFlowSnippetApi(record);
        refreshTable();
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
          width: '100px',
          render: (_, record) => {
            let ele: HTMLDivElement | null = null;
            return (
              <>
                <Dropdown
                  overlayClassName="shopify"
                  menu={{
                    items: [
                      {
                        key: 'edit',
                        icon: <WEditIcon />,
                        label: 'Edit workflow',
                        onClick: () => ele?.click()
                      },
                      {
                        key: 'details',
                        label: 'View details',
                        icon: <WAlertCircleIcon />,
                        onClick: () => onEdit?.(record, 'edit')
                      },
                      {
                        key: 'duplicate',
                        label: 'Duplicate',
                        icon: <WDuplicateIcon />
                      },
                      {
                        danger: true,
                        key: 'delete',
                        label: 'Delete',
                        icon: <WDeleteIcon />,
                        onClick: () => deleteRow(record)
                      }
                    ]
                  }}
                >
                  <IconButton icon={MenuHorizontalIcon} />
                </Dropdown>
                <TriggerModal
                  width={400}
                  title="Workflow details"
                  destroyOnHidden
                  okText="Save"
                  trigger={<div ref={e => { ele = e; }} />}
                >
                  <EditForm
                    formData={record}
                    onSuccess={refreshTable}
                  />
                </TriggerModal>
              </>
            )
          }
        }
      ]}
    />
  );
}

export default Workflows;