import dayjs from "dayjs";
import { Space, App } from "antd";
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType } from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import Table from "@/components/Table";
import PageContainer from "@/components/PageContainer";
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { getFunctionCallListApi, deleteMcpFunctionCallApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";
import type { McpFunctionCallDataType } from '@/typings/mcpConsole';

const FunctionCalls: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: McpFunctionCallDataType
  ) => {
    return (
      <TriggerModal
        width={700}
        trigger={trigger}
        title={`${record ? "Edit" : "Add"} Function Call`}
      >
        <EditForm
          formData={record}
          onSuccess={refreshTable}
        />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: McpFunctionCallDataType) => {
    modal.confirm({
      title: "Are you sure you want to delete this function call?",
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
          await deleteMcpFunctionCallApi({
            mcpFunctionCallUuid: record.mcpFunctionCallUuid
          });
          message.success('Function call deleted successfully.');
          refreshTable();
        } catch (error) {
          message.error('Failed to delete function call.');
          console.error('Delete function call error:', error);
        }
      },
    });
  });

  return (
    <PageContainer title="Function Calls">
      <Table<McpFunctionCallDataType>
        actionRef={actionRef}
        rowKey="mcpFunctionCallUuid"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-function-calls"
        request={getFunctionCallListApi}
        columns={[
          {
            dataIndex: "name",
            title: "UUID / FUNCTION",
            render: (_, record) => {
              return (
                <div>
                  <div>{record.name}</div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    {record.mcpFunctionCallUuid}
                  </div>
                </div>
              );
            },
          },
          {
            width: 120,
            dataIndex: "arguments",
            title: "ARGUMENTS",
            render: (_, record) => {
              try {
                return JSON.stringify(record.arguments);
              } catch {
                return '-';
              }
            },
          },
          {
            dataIndex: "status",
            title: "STATUS",
            render: (_, record) => {
              let color = '#faad14'; // 默认黄色
              if (record.status === 'Success') color = '#52c41a';
              if (record.status === 'Failed') color = '#f5222d';
              if (record.status === 'Running') color = '#1890ff';

              return (
                <span style={{
                  color,
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {record.status}
                </span>
              );
            },
          },
          {
            dataIndex: "timeSpent",
            title: "TIME SPENT",
            render: (_, record) => {
              return `${record.timeSpent || 0}ms`;
            },
          },
          {
            dataIndex: "createdAt",
            title: "TIMESTAMP",
            render: (_, record) => {
              return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
            },
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

export default FunctionCalls;