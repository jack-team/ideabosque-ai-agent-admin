import dayjs from "dayjs";
import { type FC, type ReactElement, cloneElement, useRef } from "react";
import { Space, App } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import CreateForm from "./components/CreateForm";
import { ShopifyButton, TriggerModal } from "@/components";
import {
  fetchMcpServersApi,
  deleteUiComponentApi,
} from "@/services/workflow";

const McpServers: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: API.Workflow.McpServerItem
  ) => {
    return (
      <TriggerModal
        width={550}
        destroyOnHidden
        trigger={trigger}
        title={`${record ? "Edit" : "Create"} Mcp server`}
      >
        <CreateForm formData={record} onSuccess={refreshTable} />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: API.Workflow.McpServerItem) => {
    modal.confirm({
      title: "Are you sure you want to delete the component?",
      okText: "Delete",
      cancelButtonProps: {
        className: "shopify",
      },
      okButtonProps: {
        className: "shopify",
      },
      onOk: async () => {
       
      },
    });
  });

  return (
    <PageContainer
      className="shopify"
      title="Mcp Servers"
      extra={renderEditModal(
        <ShopifyButton type="primary">Create Mcp Server</ShopifyButton>
      )}
    >
      <ProTable<API.Workflow.McpServerItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="mcpServerUuid"
        options={false}
        search={{
          layout: "vertical",
          optionRender: (_, __, btns) => {
            return btns.map((btn) =>
              // @ts-ignore
              cloneElement(btn, { className: "shopify" })
            );
          },
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
                  <ShopifyButton
                    danger
                    size="small"
                    onClick={() => handleDelete(record)}
                  >
                    Delete
                  </ShopifyButton>
                  {renderEditModal(
                    <ShopifyButton type="primary" size="small">
                      Edit
                    </ShopifyButton>,
                    record
                  )}
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
