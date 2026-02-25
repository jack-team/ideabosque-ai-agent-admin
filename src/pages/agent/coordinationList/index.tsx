import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import PageContainer from '@/components/PageContainer';
import { type ActionType } from '@ant-design/pro-components';
import { EditIcon, DeleteIcon, EyeCheckMarkIcon } from '@shopify/polaris-icons';
import { coordinationListApi, deleteCoordinationApi } from '@/services/agent';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import TriggerModal from '@/components/TriggerModal';
import type { CoordinationDataType } from '@/typings/agent';
import { useLang } from '@/hooks/useLang';
import { formatDate } from '@/utils';
import Table from '@/components/Table';
import EditForm from './edit';

const CoordinationList: FC = () => {
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
    <PageContainer
      fullScreen
      title={t('agent.coordinations')}
      extra={
        <TriggerModal
          width={800}
          title={t('agent.addCoordination')}
          trigger={
            <Button type="primary">
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
        rowKey="coordinationUuid"
        toolbar={{
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
    </PageContainer>
  );
}

export default CoordinationList;