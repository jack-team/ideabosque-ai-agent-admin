import dayjs from "dayjs";
import { Space } from "antd";
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType } from "@ant-design/pro-components";
import Table from '@/components/Table';
import PageContainer from "@/components/PageContainer";
import IconButton from '@/components/IconButton';
import { EditIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { getListMcpSettingsApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";
import type { McpSettingDataType } from '@/typings/mcpConsole';

const Settings: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const renderEditModal = (
    trigger: ReactElement<any>,
    record: McpSettingDataType
  ) => {
    return (
      <TriggerModal
        width={620}
        trigger={trigger}
        title="view details"
      >
        <EditForm formData={record} />
      </TriggerModal>
    );
  };

  return (
    <PageContainer title="Settings" >
      <Table<McpSettingDataType>
        actionRef={actionRef}
        rowKey="settingId"
        options={false}
        search={false}
        fullScreen={false}
        cacheKey="mcp-console-settings"
        request={getListMcpSettingsApi}
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