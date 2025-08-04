import type { FC } from 'react';
import { Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getAgentListApi } from '@/services/agent';
import { StatusMap } from '@/constants/map';
import { StatusEnum } from '@/constants/enum';

const Agents: FC = () => {
  const navigate = useNavigate();
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
            limit: params.pageSize,
            statuses: [StatusEnum.Active]
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
            key: 'action',
            title: 'Action',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={600}
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
                    />
                  </TriggerModal>
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