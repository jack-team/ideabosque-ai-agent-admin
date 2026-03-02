import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from '@/hooks/useNavigate';
import PageContainer from '@/components/PageContainer';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { type ActionType } from '@ant-design/pro-components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import type { McpServerDataType } from '@/typings/mcp';
import { mcpServerListApi, deleteMcpServerApi } from '@/services/mcp';
import { useLang } from '@/hooks/useLang';

import EditForm from './edit';

const McpServerList: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onDeleteAgent = useMemoizedFn((record: McpServerDataType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await deleteMcpServerApi({ mcpServerUuid: record.mcpServerUuid });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error(t('common.Failed to delete'));
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
      fullScreen
      title={t('common.mcpServers')}
      onBack={() => navigate('/workflow/template', { replace: true })}
      extra={
        <TriggerModal
          width={640}
          title={t('workflow.addMcpServer')}
          trigger={
            <Button type="primary">
              {t('workflow.addMcpServer')}
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
            ...paramsRef.current,
          });
        }}
        search={false}
        cacheKey="mcpServers"
        rowKey="mcpServerUuid"
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('workflow.mcpLabel'),
          },
        }}
        columns={[
          {
            title: t('workflow.mcpLabel'),
            dataIndex: 'mcpLabel',
          },
          {
            title: t('workflow.mcpServerUrl'),
            dataIndex: 'mcpServerUrl',
            hideInSearch: true
          },
          {
            title: t('common.createdAt'),
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: t('common.updatedAt'),
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: formatDate
          },
          {
            title: t('common.actions'),
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
                    title={t('workflow.editMcpServer')}
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