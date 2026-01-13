import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { PageContainer, type ActionType } from '@ant-design/pro-components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import type { McpServerDataType } from '@/typings/mcp';
import { mcpServerListApi, deleteMcpServerApi } from '@/services/mcp';

import EditForm from './edit';

const McpServerList: FC = () => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onDeleteAgent = useMemoizedFn((record: McpServerDataType) => {
    modal.confirm({
      title: 'Are you sure you want to archive?',
      okText: 'Archive',
      onOk: async () => {
        try {
          await deleteMcpServerApi({ mcpServerUuid: record.mcpServerUuid });
          onRefresh();
          message.success('Archiving succeeded');
        } catch (err) {
          message.error('Archiving failed');
        }
      }
    });
  });

  return (
    <PageContainer
      title="Mcp servers"
      onBack={() => navigate(-1)}
      extra={
        <TriggerModal
          width={640}
          title="Add mcp server"
          trigger={
            <Button type="primary">
              Add mcp server
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<McpServerDataType>
        actionRef={actionRef}
        request={params => {
          return mcpServerListApi({
            ...params,
          });
        }}
        rowKey="mcpServerUuid"
        columns={[
          {
            title: 'Mcp label',
            dataIndex: 'mcpLabel',
          },
          {
            title: 'Mcp Server Url',
            dataIndex: 'mcpServerUrl',
            hideInSearch: true
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
                    width={640}
                    title="Edit mcp server"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditForm
                      formData={record}
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

export default McpServerList;