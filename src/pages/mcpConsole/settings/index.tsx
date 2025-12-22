import dayjs from "dayjs";
import { type FC, type ReactElement, useRef } from "react";
import { Space } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import IconButton from '@/components/IconButton';
import { EditIcon } from '@shopify/polaris-icons';
import { TriggerModal } from "@/components";
import { getListMcpSettingsApi } from "@/services/mcpConsole";
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

const Settings: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const renderEditModal = (
    trigger: ReactElement<any>,
    record: ModuleItem
  ) => {
    return (
      <TriggerModal
        width={620}
        destroyOnHidden
        trigger={trigger}
        title="view details"
      >
        <EditForm formData={record} />
      </TriggerModal>
    );
  };

  return (
    <PageContainer
      className="shopify"
      title="Modules"
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
            mcpSettingList: result
          } = await getListMcpSettingsApi({
            page: params.current,
            limit: params.pageSize,
          });
          return {
            data: result.mcpSettingList || [],
            total: result?.total,
          };
        }}
        columns={[
          {
            dataIndex: "settingId",
            title: "Setting Id",
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

export default Settings;