
import type { FC } from 'react';
import { Space, Button } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import EditFrom from './components/EditForm';
import { getAgentListApi } from '@/services/agent';
import { StatusMap } from '@/constants/map';

const Agents: FC = () => {
  return (
    <PageContainer
      title="Agents"
      extra={
        <Space size={16}>
          <Button
            className="shopify"
          >
            Coordinations
          </Button>
          <TriggerModal
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
        search={{
          labelWidth: 'auto'
        }}
        toolBarRender={false}
        className="shopify"
        request={async (params) => {
          const {
            agentList: result
          } = await getAgentListApi({
            pageNumber: params.current,
            limit: params.pageSize
          });
          return {
            total: result.total,
            data: result.agentList
          }
        }}
        columns={[
          {
            title: 'Agent UUID',
            dataIndex: 'agentUuid'
          },
          {
            title: 'Agent Name',
            dataIndex: 'agentName'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueEnum: StatusMap
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true
          },
          {
            title: 'Update at',
            dataIndex: 'updatedAt',
            hideInSearch: true
          },
          {
            key: 'action',
            title: 'Action',
            hideInSearch: true,
            render: () => {
              return (
                <Space>
                  <Button
                    size="small"
                    type="primary"
                    className="shopify"
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    className="shopify"
                    danger
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