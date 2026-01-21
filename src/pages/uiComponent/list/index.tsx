import { type FC, useRef } from 'react';
import { Space, App } from 'antd';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { type ActionType } from '@ant-design/pro-components';
import PageContainer from '@/components/PageContainer';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import type { UiComponentDataType } from '@/typings/ui';
import { uiComponentListApi, deleteUiComponentApi } from '@/services/uiCpt';

import EditForm from './edit';

const UiComponentList: FC = () => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const onDeleteAgent = useMemoizedFn((record: UiComponentDataType) => {
    modal.confirm({
      title: 'Are you sure you want to archive?',
      okText: 'Archive',
      onOk: async () => {
        try {
          await deleteUiComponentApi({
            uiComponentType: record.uiComponentType,
            uiComponentUuid: record.uiComponentType
          });
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
      fullScreen
      title="UI Components"
      onBack={() => navigate('/workflow/template', { replace: true })}
      extra={
        <TriggerModal
          width={640}
          title="Add component"
          trigger={
            <Button type="primary">
              Add Component
            </Button>
          }
        >
          <EditForm onSaveSuccess={onRefresh} />
        </TriggerModal>
      }
    >
      <Table<UiComponentDataType>
        actionRef={actionRef}
        cacheKey="uiComponents"
        request={params => {
          return uiComponentListApi({
            ...params,
          });
        }}
        rowKey="uiComponentUuid"
        columns={[
          {
            title: 'Tag name',
            dataIndex: 'tagName',
          },
          {
            title: 'Component Type',
            dataIndex: 'uiComponentType',
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
                    title="Edit component"
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