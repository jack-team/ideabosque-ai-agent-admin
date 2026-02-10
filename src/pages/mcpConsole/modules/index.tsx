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
import type { McpModuleDataType } from '@/typings/mcpConsole';

const Modules: FC = () => {
  const [confirm] = useConfirm();
  const { message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
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
          "Create New Module" :
          "Connection Module Details"
          }`
        }
      >
        <EditForm
          formData={record}
          onSuccess={refreshTable}
        />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: McpModuleDataType) => {
    confirm({
      title: "Are you sure you want to delete this module?",
      okText: "Delete",
      onConfirm: async () => {
        try {
          await deleteMcpModuleApi({
            moduleName: record.moduleName
          });
          message.success('Module deleted successfully.');
          refreshTable();
        } catch (error) {
          message.error('Failed to delete module.');
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
      title="Connection Modules"
      subTitle="These are the MCP connections that the functions use to carry out their specific tasks."
    >
      <Table<McpModuleDataType>
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-modules"
        request={params=> {
          return getModuleListApi({
            ...params,
            ...paramsRef.current
          })
        }}
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: 'Module Name',
          },
        }}
        columns={[
          {
            dataIndex: "moduleName",
            title: "Module Name",
          },
          {
            dataIndex: "packageName",
            title: "Package",
          },
          {
            dataIndex: "classes",
            title: "Classes",
            render: (_, { classes }) => {
              return classes?.map(e => e.className)?.join(', ');
            },
          },
          {
            dataIndex: "source",
            title: "Source",
            render: (_, { source }) => {
              return source || '-';
            },
          },
          {
            dataIndex: "updatedAt",
            title: "Last updated",
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: "Actions",
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