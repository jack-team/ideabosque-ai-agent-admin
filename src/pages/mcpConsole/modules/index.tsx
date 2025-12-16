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
import { getModuleListApi, deleteMcpModuleApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";

// 定义模块数据类型
export type ModuleItem = {
  moduleName: string;
  packageName: string;
  classes: string[];
  source?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

const Modules: FC = () => {
  const { modal, message } = App.useApp();
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
        <EditForm
          formData={record}
          onSuccess={refreshTable}
        />
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
    <PageContainer
      className="shopify"
      title="Modules"
      onBack={() => navigate(-1)}
    >
      <ProTable<ModuleItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
        search={false}
        pagination={{ showQuickJumper: true }}
        request={async (params) => {
          const {
            mcpModuleList: result
          } = await getModuleListApi({
            page: params.current,
            limit: params.pageSize,
          });
          return {
            data: result.mcpModuleList || [],
            total: result?.total,
          };
        }}
        columns={[
          {
            dataIndex: "moduleName",
            title: "MODULE NAME",
          },
          {
            dataIndex: "packageName",
            title: "PACKAGE",
          },
          {
            dataIndex: "classes",
            title: "CLASSES",
            render: (_, { classes }) => {
              return classes?.map((e: any) => e.class_name)?.join(', ');
            },
          },
           {
            dataIndex: "source",
            title: "SOURCE",
            render: (_, { source }) => {
              return source || '-';
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

export default Modules;