import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { type ActionType } from '@ant-design/pro-components';
import { useNavigate } from '@/hooks/useNavigate';
import PageContainer from '@/components/PageContainer';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import type { UiComponentDataType } from '@/typings/ui';
import { uiComponentListApi, deleteUiComponentApi } from '@/services/uiCpt';
import { useLang } from '@/hooks/useLang';

import EditForm from './edit';

const UiComponentList: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload?.(true);
  });

  const onDeleteAgent = useMemoizedFn((record: UiComponentDataType) => {
    modal.confirm({
      title: t('common.Are you sure you want to delete'),
      okText: t('common.delete'),
      onOk: async () => {
        try {
          await deleteUiComponentApi({
            uiComponentType: record.uiComponentType,
            uiComponentUuid: record.uiComponentType
          });
          onRefresh();
          message.success(t('common.Deleted successfully'));
        } catch (err) {
          message.error(t('common.Failed to delete'));
        }
      }
    });
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { tagName: val };
    onRefresh();
  });

  return (
    <PageContainer
      fullScreen
      title={t('common.uiComponents')}
      onBack={() => navigate('/workflow/template', { replace: true })}
      extra={
        <TriggerModal
          width={640}
          title={t('workflow.addComponent')}
          trigger={
            <Button type="primary">
              {t('workflow.addComponent')}
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<UiComponentDataType>
        search={false}
        actionRef={actionRef}
        cacheKey="uiComponents"
        request={params => {
          return uiComponentListApi({
            ...params,
            ...paramsRef.current,
          });
        }}
        rowKey="uiComponentUuid"
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('workflow.tagName'),
          },
        }}
        columns={[
          {
            title: t('workflow.tagName'),
            dataIndex: 'tagName',
            hideInSearch: true
          },
          {
            title: t('workflow.componentType'),
            dataIndex: 'uiComponentType',
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
                    title={t('workflow.editComponent')}
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

export default UiComponentList;