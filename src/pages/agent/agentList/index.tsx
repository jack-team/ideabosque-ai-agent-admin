import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import PageContainer from '@/components/PageContainer';
import { type ActionType } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, DuplicateIcon } from '@shopify/polaris-icons';
import { formatDate } from '@/utils';
import { StatusEnum } from '@/constants/enum';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import StatusTag from '@/components/StatusTag';
import TriggerModal from '@/components/TriggerModal';
import { agentListApi } from '@/services/agent';
import type { AgentDataType } from '@/typings/agent';
import { insertUpdateAgentApi } from '@/services/agent';

import EditForm from './edit';
import Versions from './versions';

const AgentList: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onDeleteAgent = useMemoizedFn((record: AgentDataType) => {
    modal.confirm({
      title: 'Are you sure you want to archive?',
      okText: 'Archive',
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
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { agentName: val };
    onRefresh();
  });

  return (
    <PageContainer
      title="Agents"
      extra={
        <TriggerModal
          width={800}
          title="Add agent"
          trigger={
            <Button type="primary">
              Add agent
            </Button>
          }
        >
          <EditForm />
        </TriggerModal>
      }
    >
      <Table<AgentDataType>
        actionRef={actionRef}
        request={params => {
          return agentListApi({
            ...params,
            ...paramsRef.current,
            statuses: [StatusEnum.Active]
          });
        }}
        search={false}
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: 'Agent Name',
          },
        }}
        rowKey="agentUuid"
        columns={[
          {
            title: 'Agent UUID',
            dataIndex: 'agentUuid',
          },
          {
            title: 'Agent Name',
            dataIndex: 'agentName'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <StatusTag suatus={record.status}>
                  {record.status}
                </StatusTag>
              );
            }
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: 'Last updated',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            hideInSearch: true,
            width: 120,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={800}
                    title="Edit agent"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditForm
                      agent={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <TriggerModal
                    width={600}
                    title="Versions"
                    okText="Apply"
                    trigger={<IconButton icon={DuplicateIcon} />}
                  >
                    <Versions
                      agent={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => onDeleteAgent(record)}
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

export default AgentList;