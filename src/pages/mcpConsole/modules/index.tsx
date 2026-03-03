import { Space, App } from "antd";
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType, ProCard } from '@ant-design/pro-components';
import { useMemoizedFn } from "ahooks";
import Table from '@/components/Table';
import { useConfirm } from '@/hooks/useConfirm';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { getModuleListApi, deleteMcpModuleApi } from '@/services/mcpConsole';
import EditForm from './components/EditForm';
import { formatDate } from '@/utils';
import { useLang } from '@/hooks/useLang';
import type { McpModuleDataType } from '@/typings/mcpConsole';

const Modules: FC = () => {
  const { t } = useLang();
  const [confirm] = useConfirm();
  const { message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload(true);
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: McpModuleDataType
  ) => {
    return (
      <TriggerModal
        width={620}
        trigger={trigger}
        title={`${!record ?
          t('mcpConsole.Create New Module') :
          t('mcpConsole.Connection Module Details')
          }`
        }
      >
        <EditForm
          formData={record}
          onSuccess={refreshTable}
          onSaveBefore={() => {
            return new Promise((resolve, reject) => {
              confirm({
                staticFn: true,
                enableConfirm: true,
                title: t('common.updateTipText'),
                onConfirm: async () => resolve(),
                onCancel: reject
              });
            })
          }}
        />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: McpModuleDataType) => {
    confirm({
      enableConfirm: true,
      title: t('common.Are you sure you want to delete'),
      content: t('common.updateTipText'),
      okText: t('common.delete'),
      onConfirm: async () => {
        try {
          await deleteMcpModuleApi({
            moduleName: record.moduleName
          });
          message.success(t('common.Deleted successfully'));
          refreshTable();
        } catch (error) {
          message.error(t('common.Failed to delete'));
          console.error('Delete module error:', error);
        }
      },
    });
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { moduleName: val };
    refreshTable();
  });

  return (
    <ProCard
      title={t('mcpConsole.Connection Modules')}
      subTitle={t('mcpConsole.Connection Modules desc')}
    >
      <Table<McpModuleDataType>
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-modules"
        request={params => {
          return getModuleListApi({
            ...params,
            ...paramsRef.current
          })
        }}
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('mcpConsole.Module name'),
          },
        }}
        columns={[
          {
            dataIndex: "moduleName",
            title: t('mcpConsole.Module name')
          },
          {
            dataIndex: "packageName",
            title: t('mcpConsole.Package'),
          },
          {
            dataIndex: "classes",
            title: t('mcpConsole.Classes'),
            render: (_, { classes }) => {
              return classes?.map(e => e.className)?.join(', ');
            },
          },
          {
            dataIndex: "source",
            title: t('mcpConsole.Source'),
            render: (_, { source }) => {
              return source || '-';
            },
          },
          {
            dataIndex: "updatedAt",
            title: t('common.updatedAt'),
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: t('common.actions'),
            width: "100px",
            align: "center",
            fixed: "right",
            render: (_, record) => {
              return (
                <Space>
                  {renderEditModal(
                    <IconButton icon={EditIcon} />,
                    record
                  )}
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleDelete(record)}
                  />
                </Space>
              );
            },
          },
        ]}
        scroll={{ x: "max-content" }}
      />
    </ProCard>
  );
};

export default Modules;