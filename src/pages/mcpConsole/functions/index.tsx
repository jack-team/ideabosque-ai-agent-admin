import { Space, App } from "antd";
import { useMemoizedFn } from "ahooks";
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType } from "@ant-design/pro-components";
import PageContainer from "@/components/PageContainer";
import Table from "@/components/Table";
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { getFunctionListApi, deleteMcpFunctionApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";
import type { McpFunctionDataType } from '@/typings/mcpConsole';
import { formatDate } from '@/utils';

const Functions: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: McpFunctionDataType
  ) => {
    return (
      <TriggerModal
        width={700}
        trigger={trigger}
        title={`${record ? "Edit" : "Add"} Function`}
      >
        <EditForm
          formData={record}
          onSuccess={refreshTable}
        />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: McpFunctionDataType) => {
    modal.confirm({
      title: "Are you sure you want to delete this function?",
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
          await deleteMcpFunctionApi({
            name: record.name
          });
          message.success('Function deleted successfully.');
          refreshTable();
        } catch (error) {
          message.error('Failed to delete function.');
          console.error('Delete function error:', error);
        }
      },
    });
  });

  return (
    <PageContainer title="Functions">
      <Table<McpFunctionDataType>
        actionRef={actionRef}
        rowKey="functionName"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-functions"
        request={getFunctionListApi}
        columns={[
          {
            dataIndex: "name",
            title: "Function Name",
          },
          {
            dataIndex: "mcpType",
            title: "Type"
          },
          {
            dataIndex: "moduleName",
            title: "Module / Class",
            render: (_, record) => {
              return [record.moduleName, record.className].join(' / ');
            },
          },
          {
            dataIndex: "isAsync",
            title: "Async",
            render: (_, record) => {
              return record.isAsync ? 'ASYNC' : 'SYNC';
            },
          },
          {
            dataIndex: "returnType",
            title: "Return Type",
            render: (_, record) => {
              return record.returnType || '-';
            },
          },
          {
            dataIndex: "updatedAt",
            title: "Last Updated",
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: "ACTIONS",
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

export default Functions;