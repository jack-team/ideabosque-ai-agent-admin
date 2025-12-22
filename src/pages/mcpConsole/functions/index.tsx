import dayjs from "dayjs";
import { type FC, type ReactElement, useRef } from "react";
import { Space, App, Tag } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { TriggerModal } from "@/components";
import { getFunctionListApi, deleteMcpFunctionApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";

// 定义函数数据类型
export type FunctionItem = {
  endpointId: string;
  name: string;
  mcpType: string;
  description?: string;
  data?: any;
  annotations?: string;
  moduleName?: string;
  className?: string;
  functionName?: string;
  returnType?: string;
  isAsync?: boolean;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

const Functions: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: FunctionItem
  ) => {
    return (
      <TriggerModal
        width={700}
        destroyOnHidden
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

  const handleDelete = useMemoizedFn((record: FunctionItem) => {
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
    <PageContainer
      className="shopify"
      title="Functions"
    >
      <ProTable<FunctionItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="name"
        options={false}
        search={false}
        pagination={{ pageSize: 5 }}
        request={async (params) => {
          const {
            mcpFunctionList: res
          } = await getFunctionListApi({
            pageNumber: params.current,
            limit: params.pageSize,
            ...params
          });

          return {
            data: res?.mcpFunctionList || [],
            total: res?.total || 0,
          };
        }}
        columns={[
          {
            dataIndex: "name",
            title: "FUNCTION NAME",
          },
          {
            dataIndex: "mcpType",
            title: "TYPE",
            render: (_, { mcpType }) => {
              const c = {
                resource: '#fa8c16',
                tool: '#722ed1'
              }
              const b = {
                resource: '#fff7e6',
                tool: '#f9f0ff'
              }
              return (
                <Tag style={{
                  color: c[mcpType as never] || c.resource,
                  backgroundColor: b[mcpType as never] || b.resource
                }}>{mcpType}</Tag>
              );
            },
          },
          {
            dataIndex: "moduleName",
            title: "MODULE / CLASS",
            render: (_, record) => {
              return (
                <div>
                  <div>{record.moduleName || '-'}</div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.className || '-'}</div>
                </div>
              );
            },
          },
          {
            dataIndex: "isAsync",
            title: "ASYNC",
            render: (_, record) => {
              return (
                <span style={{
                  color: '#1890ff',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {record.isAsync ? 'ASYNC' : 'SYNC'}
                </span>
              );
            },
          },
          {
            dataIndex: "returnType",
            title: "RETURN TYPE",
            render: (_, record) => {
              return record.returnType || '-';
            },
          },
          {
            dataIndex: "updatedAt",
            title: "LAST UPDATED",
            render: (_, record) => {
              return dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss');
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

export default Functions;