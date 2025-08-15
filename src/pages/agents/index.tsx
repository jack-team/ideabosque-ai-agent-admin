import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import VersionForm from './components/VersionForm';
import { getAgentListApi, insertUpdateAgentApi } from '@/services/agent';
import { StatusMap } from '@/constants/map';
import { StatusEnum } from '@/constants/enum';

const Agents: FC = () => {
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
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
      extra={
        <Space size={16}>
          <Button
            className="shopify"
            onClick={() => navigate('/coordinations')}
          >
            Coordinations
          </Button>
          <TriggerModal
            width={600}
            className="shopify"
            title="Create agent"
            trigger={
              <Button
                className="shopify"
                type="primary"
              >
                Create agent
              </Button>
            }
          >
            <EditFrom />
          </TriggerModal>
        </Space>
      }
    >
      <ProTable
        actionRef={ref}
        search={false}
        size="small"
        options={false}
        rowKey="agentUuid"
        className="shopify"
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
            title: 'Agent Name',
            dataIndex: 'agentName'
          },
          {
            title: 'Agent UUID',
            dataIndex: 'agentUuid'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueEnum: StatusMap,
            hideInSearch: true
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
            width: '240px',
            key: 'action',
            title: 'Action',
            align: 'center',
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={600}
                    destroyOnHidden
                    className="shopify"
                    title="Create agent"
                    trigger={
                      <Button
                        size="small"
                        type="primary"
                        className="shopify"
                      >
                        Edit
                      </Button>
                    }
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
                    trigger={
                      <Button
                        size="small"
                        className="shopify"
                      >
                        Versions
                      </Button>
                    }
                  >
                    <VersionForm
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <Button
                    danger
                    size="small"
                    className="shopify"
                    onClick={() => handleArchive(record)}
                  >
                    Archive
                  </Button>
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