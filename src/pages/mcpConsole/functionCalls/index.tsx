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
import { TriggerModal } from "@/components";
import { getFunctionCallListApi, deleteMcpFunctionCallApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";

// 定义函数调用数据类型
export type FunctionCallItem = {
  endpointId: string;
  mcpFunctionCallUuid: string;
  mcpType: string;
  name: string;
  arguments?: any;
  content?: string;
  status: string;
  notes?: string;
  timeSpent?: number;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

const FunctionCalls: FC = () => {
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: FunctionCallItem
  ) => {
    return (
      <TriggerModal
        width={700}
        destroyOnHidden
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

  const handleDelete = useMemoizedFn((record: FunctionCallItem) => {
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
    <PageContainer
      className="shopify"
      title="Function Calls"
      onBack={() => navigate(-1)}
    >
      <ProTable<FunctionCallItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="mcpFunctionCallUuid"
        options={false}
        search={false}
        pagination={{ pageSize: 5 }}
        request={async (params) => {
          const {
            mcpFunctionCallList: res
          } = await getFunctionCallListApi({
            pageNumber: params.current,
            limit: params.pageSize,
            ...params
          });

          return {
            data: res?.mcpFunctionCallList || [],
            total: res?.total || 0,
          };
        }}
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