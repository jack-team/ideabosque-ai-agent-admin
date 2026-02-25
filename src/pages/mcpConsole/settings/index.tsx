import { Space } from "antd";
import { useMemoizedFn } from 'ahooks';
import { type FC, type ReactElement, useRef } from "react";
import { type ActionType, ProCard } from "@ant-design/pro-components";
import Table from '@/components/Table';
import IconButton from '@/components/IconButton';
import { EditIcon } from '@shopify/polaris-icons';
import TriggerModal from "@/components/TriggerModal";
import { useLang } from '@/hooks/useLang';
import { getListMcpSettingsApi } from "@/services/mcpConsole";
import EditForm from "./components/EditForm";
import type { McpSettingDataType } from '@/typings/mcpConsole';
import { formatDate } from '@/utils';

const Settings: FC = () => {
  const { t } = useLang();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload(true);
  })

  const renderEditModal = (
    trigger: ReactElement<any>,
    record: McpSettingDataType
  ) => {
    return (
      <TriggerModal
        width={800}
        trigger={trigger}
        title={t('mcpConsole.View details')}
      >
        <EditForm
          formData={record}
          onSaved={onRefresh}
        />
      </TriggerModal>
    );
  };

  return (
    <ProCard title={t('mcpConsole.Settings')} >
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
            title: t('mcpConsole.Setting id'),
          },
          {
            dataIndex: "updatedAt",
            title: t('common.updatedAt'),
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: t('common.actions'),
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
    </ProCard>
  );
};

export default Settings;