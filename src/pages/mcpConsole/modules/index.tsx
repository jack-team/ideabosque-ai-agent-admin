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
import { ShopifyButton, TriggerModal } from "@/components";
import { getModuleListApi } from "@/services/mcpConsole";

// 定义模块数据类型
export type ModuleItem = {
  moduleName: string;
  package: string;
  classes: string[];
  status: 'Active' | 'Inactive';
  lastUpdated: string;
};

// 模拟数据
const mockModules: ModuleItem[] = [
  {
    moduleName: 'auth_service',
    package: 'mcp_auth',
    classes: ['AuthHandler', 'TokenManager'],
    status: 'Active',
    lastUpdated: dayjs().subtract(2, 'minute').toISOString(),
  },
  {
    moduleName: 'data_processor',
    package: 'mcp_data',
    classes: ['DataCleaner', 'ETL'],
    status: 'Active',
    lastUpdated: dayjs().subtract(1, 'hour').toISOString(),
  },
  {
    moduleName: 'notification_center',
    package: 'mcp_notify',
    classes: ['EmailSender', 'PushNotifier'],
    status: 'Inactive',
    lastUpdated: dayjs().subtract(3, 'hour').toISOString(),
  },
];

const Modules: FC = () => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: ModuleItem
  ) => {
    return (
      <TriggerModal
        width={620}
        destroyOnHidden
        trigger={trigger}
        title={`${record ? "Edit" : "Add"} Module`}
      >
        {/* 这里可以替换为实际的表单组件 */}
        <div style={{ padding: '20px' }}>
          <p>Module Form</p>
          <p>Module Name: {record?.moduleName}</p>
        </div>
      </TriggerModal>
    );
  };

  const handleDelete = useMemoizedFn((record: ModuleItem) => {
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
        // 这里可以添加实际的删除逻辑
        console.log('Delete module:', record.moduleName);
        refreshTable();
      },
    });
  });

  return (
    <PageContainer
      className="shopify"
      title="Modules"
      onBack={() => navigate(-1)}
      extra={renderEditModal(
        <ShopifyButton type="primary">Add Module</ShopifyButton>
      )}
    >
      <ProTable<ModuleItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
        search={{}}
        pagination={{ showQuickJumper: true }}
        request={async (params) => {
          const res = await getModuleListApi(params);
          return {
            data: res.data?.ListMcpModules || [],
            total: res.data?.ListMcpModules?.total || 0,
          };
        }}
        columns={[
          {
            dataIndex: "moduleName",
            title: "MODULE NAME",
          },
          {
            dataIndex: "package",
            title: "PACKAGE",
          },
          {
            dataIndex: "classes",
            title: "CLASSES",
            render: (_, record) => {
              return record.classes.join(', ');
            },
          },
          {
            dataIndex: "status",
            title: "STATUS",
            render: (_, record) => {
              return (
                <span style={{
                  color: record.status === 'Active' ? '#52c41a' : '#faad14',
                  fontWeight: 'bold'
                }}>
                  {record.status}
                </span>
              );
            },
          },
          {
            dataIndex: "lastUpdated",
            title: "LAST UPDATED",
            render: (_, record) => {
              const updatedTime = dayjs(record.lastUpdated);
              const now = dayjs();
              const diffMinutes = now.diff(updatedTime, 'minute');
              
              if (diffMinutes < 60) {
                return `${diffMinutes} mins ago`;
              } else {
                const diffHours = now.diff(updatedTime, 'hour');
                return `${diffHours} hours ago`;
              }
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

export default Modules;