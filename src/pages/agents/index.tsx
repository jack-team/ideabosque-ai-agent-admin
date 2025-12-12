import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import VersionForm from './components/VersionForm';
import { getAgentListApi, insertUpdateAgentApi } from '@/services/agent';
import { StatusMap } from '@/constants/map';
import { StatusEnum } from '@/constants/enum';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon, DuplicateIcon } from '@shopify/polaris-icons';

const Agents: FC = () => {
  const { modal, message } = App.useApp();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  const handleArchive = useMemoizedFn((record: Record<string, any>) => {
    modal.confirm({
      title: 'Are you sure you want to archive?',
      okText: 'Archive',
      okButtonProps: {
        danger: true,
        className: 'shopify'
      },
      onOk: async () => {
        try {
          await insertUpdateAgentApi({
            agentUuid: record.agentUuid,
            agentVersionUuid: record.agentVersionUuid,
            status: StatusEnum.Inactive,
            updatedBy: 'Admin'
          });
          onRefresh();
          message.success('Archiving succeeded');
        } catch (err) {
          message.error('Archiving failed');
        }
      }
    });
  })

  return (
    <PageContainer
      title="Agents"
      className="shopify"
      extra={
        <TriggerModal
          width={620}
          className="shopify"
          title="Add agent"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Add agent
            </Button>
          }
        >
          <EditFrom />
        </TriggerModal>
      }
    >
      <ProTable
        actionRef={ref}
        search={false}
        size="small"
        options={false}
        rowKey="agentUuid"
        className="shopify"
        pagination={{
          defaultPageSize: 4
        }}
        scroll={{ x: 'max-content' }}
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            agentList: result
          } = await getAgentListApi({
            limit: pageSize,
            pageNumber: current,
            statuses: [StatusEnum.Active],
            ...rest
          });

          return {
            total: result.total,
            data: result.agentList
          }
        }}
        columns={[
          {
            title: 'Status',
            dataIndex: 'status',
            valueEnum: StatusMap,
            hideInSearch: true
          },
          {
            title: 'Agent Name',
            dataIndex: 'agentName'
          },
          {
            title: 'Agent UUID',
            dataIndex: 'agentUuid'
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.createdAt)
          },
          {
            title: 'Update at',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.updatedAt)
          },
          {
            width: '120px',
            key: 'action',
            title: 'Action',
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    centered
                    width={620}
                    destroyOnHidden
                    className="shopify"
                    title="Agent details"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <TriggerModal
                    width={400}
                    title="Versions"
                    destroyOnHidden
                    okText="Apply"
                    trigger={<IconButton icon={DuplicateIcon} />}
                  >
                    <VersionForm
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleArchive(record)}
                  />
                </Space>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default Agents;