import dayjs from "dayjs";
import { type FC, type ReactElement, useRef } from "react";
import { useNavigate } from 'react-router';
import { Space, App } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import CreateForm from "./components/CreateForm";
import { ShopifyButton, TriggerModal } from "@/components";
import {
  fetchMcpServersApi,
} from "@/services/workflow";

const McpServers: FC = () => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: API.Workflow.McpServerItem
  ) => {
    return (
      <TriggerModal
        width={620}
        destroyOnHidden
        trigger={trigger}
        title={`${record ? "Edit" : "Add"} Mcp server`}
      >
        <CreateForm formData={record} onSuccess={refreshTable} />
      </TriggerModal>
    );
  };

  //@ts-ignore
  const handleDelete = useMemoizedFn((record: API.Workflow.McpServerItem) => {
    modal.confirm({
      title: "Are you sure you want to delete the component?",
      okText: "Delete",
      cancelButtonProps: {
        className: "shopify gray",
      },
      okButtonProps: {
        className: "shopify",
        danger: true
      },
      onOk: async () => {

      },
    });
  });

  return (
    <PageContainer
      className="shopify"
      title="Mcp Servers"
      onBack={() => navigate(-1)}
      extra={renderEditModal(
        <ShopifyButton type="primary">Add Mcp Server</ShopifyButton>
      )}
    >
      <ProTable<API.Workflow.McpServerItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="mcpServerUuid"
        options={false}
        search={false}
        pagination={{
          defaultPageSize: 5
        }}
        columns={[
          {
            dataIndex: "mcpLabel",
            title: "Mcp label",
          },
          {
            dataIndex: "mcpServerUrl",
            title: "Mcp Server Url",
            hideInSearch: true
          },
          {
            dataIndex: "createdAt",
            title: "Created At",
            hideInSearch: true,
            render: (_, record) => {
              return dayjs(record.createdAt).format("YYYY/MM/DD HH:mm:ss");
            },
          },
          {
            dataIndex: "updatedAt",
            title: "Updated at",
            hideInSearch: true,
            render: (_, record) => {
              return dayjs(record.updatedAt).format("YYYY/MM/DD HH:mm:ss");
            },
          },
          {
            dataIndex: "updatedBy",
            title: "Updated by",
            hideInSearch: true,
          },
          {
            key: "action",
            title: "Action",
            width: "100px",
            align: "center",
            hideInSearch: true,
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
        request={async (params) => {
          const { current = 1, pageSize = 10, ...reset } = params;

          const { mcpServerList: result } = await fetchMcpServersApi({
            pageNumber: current,
            limit: pageSize,
            ...reset,
          });
          return {
            total: result.total,
            data: result.mcpServerList,
          };
        }}
      />
    </PageContainer>
  );
};

export default McpServers;
