import { type FC, useRef, type RefObject } from 'react';
import { Space, App } from 'antd';
import { useNavigate } from '@/hooks/useNavigate';
import { useMemoizedFn } from 'ahooks';
import { type ActionType, ProCard } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, EyeCheckMarkIcon, PlusIcon } from '@shopify/polaris-icons';
import { coordinationListApi, deleteCoordinationApi } from '@/services/agent';
import Button from '@/components/Button';
import IconButton, { withIcon } from '@/components/IconButton';
import TriggerModal from '@/components/TriggerModal';
import type { CoordinationDataType } from '@/typings/agent';
import { useLang } from '@/hooks/useLang';
import { formatDate } from '@/utils';
import Table from '@/components/Table';
import EditForm from './edit';

const WPlusIcon = withIcon(PlusIcon);

type CoordinationListProps = {
  addRef?: RefObject<HTMLDivElement | null>;
}

const CoordinationList: FC<CoordinationListProps> = (props) => {
  const { t } = useLang();
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { coordinationName: val };
    actionRef.current?.reload(true);
  });

  const onDelete = useMemoizedFn((record: CoordinationDataType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await deleteCoordinationApi({
            coordinationUuid: record.coordinationUuid
          });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error('common.Failed to delete');
          return Promise.reject(err);
        }
      }
    });
  });

  return (
    <ProCard
      title={t('agent.Agent Coordinations')}
      subTitle={t('agent.Agent Coordinations desc')}
      extra={
        <TriggerModal
          width={800}
          title={t('agent.addCoordination')}
          trigger={
            <Button type="link" icon={<WPlusIcon />} ref={props.addRef}>
              {t('agent.addCoordination')}
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<CoordinationDataType>
        actionRef={actionRef}
        fullScreen={false}
        cacheKey="coordinationList"
        request={params => {
          return coordinationListApi({
            ...params,
            ...paramsRef.current
          });
        }}
        search={false}
        options={false}
        rowKey="coordinationUuid"
        //@ts-ignore
        toolbar={false && {
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('agent.coordinationName'),
          },
        }}
        columns={[
          {
            title: t('agent.coordinationUuid'),
            dataIndex: 'coordinationUuid',
            hideInSearch: true
          },
          {
            title: t('agent.coordinationName'),
            dataIndex: 'coordinationName'
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
              const { agents = [] } = record;
              return (
                <Space>
                  <IconButton
                    disabled={!agents.length}
                    icon={EyeCheckMarkIcon}
                    onClick={() => navigate(`/agent/review/${record.coordinationUuid}`)}
                  />
                  <TriggerModal
                    width={800}
                    title={t('agent.edtCoordination')}
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditForm
                      coordination={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => onDelete(record)}
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

export default CoordinationList;