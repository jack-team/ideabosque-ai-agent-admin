import { Space, App } from "antd";
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType } from '@ant-design/pro-components';
import { useMemoizedFn } from "ahooks";
import Table from '@/components/Table';
import PageContainer from "@/components/PageContainer";
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { getModuleListApi, deleteMcpModuleApi } from '@/services/mcpConsole';
import EditForm from './components/EditForm';
import { formatDate } from '@/utils';
import type { McpModuleDataType } from '@/typings/mcpConsole';

const Modules: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

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
        title={`${record ? "Edit" : "Add"} Module`}
      >
        <EditForm
          formData={record}
          onSuccess={refreshTable}
        />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: McpModuleDataType) => {
    modal.confirm({
      title: "Are you sure you want to delete this module?",
      okText: "Delete",
      cancelButtonProps: {
        className: "shopify gray",
      },
      okButtonProps: {
        className: "shopify",
        danger: true
      },
      onOk: async () => {
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

  return (
    <PageContainer title="Modules">
      <Table<McpModuleDataType>
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-modules"
        request={getModuleListApi}
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
    </PageContainer>
  );
};

export default Modules;