import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { type FC, useRef, type RefObject } from 'react';
import { type ActionType, ProCard } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, DuplicateIcon, PlusIcon } from '@shopify/polaris-icons';
import { StatusEnum, StatusMap } from '@/constants/enum';
import { formatDate } from '@/utils';
import IconButton, { withIcon } from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import StatusTag from '@/components/StatusTag';
import TriggerModal from '@/components/TriggerModal';
import { agentListApi } from '@/services/agent';
import type { AgentDataType } from '@/typings/agent';
import { insertUpdateAgentApi } from '@/services/agent';
import { useLang } from '@/hooks/useLang';

import EditForm from './edit';
import Versions from './versions';

const WPlusIcon = withIcon(PlusIcon);

type AgentListProps = {
  addRef?: RefObject<HTMLDivElement | null>;
}

const AgentList: FC<AgentListProps> = (props) => {
  const { t } = useLang();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onDeleteAgent = useMemoizedFn((record: AgentDataType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await insertUpdateAgentApi({
            agentUuid: record.agentUuid,
            agentVersionUuid: record.agentVersionUuid,
            status: StatusEnum.Inactive,
            updatedBy: 'Admin'
          });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error('common.Failed to delete');
        }
      }
    });
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { agentName: val };
    onRefresh();
  });

  return (
    <ProCard
      title={t('agent.Individual Agents')}
      subTitle={t('agent.Individual Agents desc')}
      extra={
        <TriggerModal
          width={800}
          title={t('agent.addAgent')}
          trigger={
            <Button type="link" icon={<WPlusIcon />} ref={props.addRef}>
              {t('agent.addAgent')}
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<AgentDataType>
        fullScreen={false}
        actionRef={actionRef}
        cacheKey="agentList"
        request={params => {
          return agentListApi({
            ...params,
            ...paramsRef.current,
            statuses: [StatusEnum.Active]
          });
        }}
        options={false}
        search={false}
        //@ts-ignore
        toolbar={ false && {
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('agent.agentName'),
          },
        }}
        rowKey="agentUuid"
        columns={[
          {
            title: t('agent.agentUuid'),
            dataIndex: 'agentUuid',
          },
          {
            title: t('agent.agentName'),
            dataIndex: 'agentName'
          },
          {
            title: t('common.status'),
            dataIndex: 'status',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <StatusTag suatus={record.status}>
                  {t(StatusMap[record.status])}
                </StatusTag>
              );
            }
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
                    width={800}
                    title={t('agent.editAgent')}
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditForm
                      agent={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <TriggerModal
                    width={600}
                    title={t('common.versions')}
                    okText={t('common.apply')}
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
    </ProCard>
  );
}

export default AgentList;