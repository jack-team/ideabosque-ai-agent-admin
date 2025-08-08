import dayjs from "dayjs";
import { type FC, type ReactElement, cloneElement, useRef } from "react";
import { useNavigate } from 'react-router';
import { Space, App } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { ComponentTypeMap } from "./const";
import CreateForm from "./components/CreateForm";
import { ShopifyButton, TriggerModal } from "@/components";
import {
  fetchuiComponentsApi,
  deleteUiComponentApi,
} from "@/services/workflow";

const UiComponents: FC = () => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: API.Workflow.UiComponentType
  ) => {
    return (
      <TriggerModal
        width={600}
        destroyOnHidden
        trigger={trigger}
        title={`${record ? "Edit" : "Create"} Component`}
      >
        <CreateForm formData={record} onSuccess={refreshTable} />
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: API.Workflow.UiComponentType) => {
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
        await deleteUiComponentApi({
          uiComponentType: record.uiComponentType,
          uiComponentUuid: record.uiComponentUuid,
        });
        refreshTable();
        message.success("Component deleted successfully.");
      },
    });
  });

  return (
    <PageContainer
      className="shopify"
      title="Ui Components"
      onBack={() => navigate(-1)}
      extra={renderEditModal(
        <ShopifyButton type="primary">Create Component</ShopifyButton>
      )}
    >
      <ProTable<API.Workflow.UiComponentType>
        className="shopify"
        actionRef={actionRef}
        rowKey="uiComponentUuid"
        options={false}
        search={false}
        columns={[
          {
            dataIndex: "tagName",
            title: "Tag Name",
          },
          {
            dataIndex: "uiComponentType",
            title: "Component Type",
            valueEnum: ComponentTypeMap,
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

          const { uiComponentList: result } = await fetchuiComponentsApi({
            pageNumber: current,
            limit: pageSize,
            ...reset,
          });
          return {
            total: result.total,
            data: result.uiComponentList,
          };
        }}
      />
    </PageContainer>
  );
};

export default UiComponents;
