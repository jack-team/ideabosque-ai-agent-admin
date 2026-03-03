import { App, Tag, Space } from "antd";
import { useMemoizedFn } from "ahooks";
import { type FC, useRef } from "react";
import { Link } from '@/components/Link';
import { useNavigate } from '@/hooks/useNavigate';
import Table from "@/components/Table";
import { useLang } from '@/hooks/useLang';
import { useConfirm } from '@/hooks/useConfirm';
import IconButton from '@/components/IconButton';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { type ActionType, ProCard } from "@ant-design/pro-components";
import { getFunctionListApi, deleteMcpFunctionApi } from "@/services/mcpConsole";
import type { McpFunctionDataType } from '@/typings/mcpConsole';
import { formatDate } from '@/utils';
import styles from './styles.module.less';

const Functions: FC = () => {
  const { t } = useLang();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);
  const [confirm] = useConfirm();

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload(true);
  });

  const handleDelete = useMemoizedFn((record: McpFunctionDataType) => {
    confirm({
      enableConfirm: true,
      title: t('common.Are you sure you want to delete'),
      content: t('common.updateTipText'),
      okText: t('common.delete'),
      async onConfirm() {
        try {
          await deleteMcpFunctionApi({
            name: record.name
          });
          message.success(t('common.Deleted successfully'));
          refreshTable();
        } catch (error) {
          message.error(t('common.Failed to delete'));
          console.error('Delete function error:', error);
        }
      },
    });
  });

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { functionName: val };
    refreshTable();
  });

  return (
    <ProCard
      title={t('mcpConsole.Functions')}
      subTitle={t('mcpConsole.FunctionsDesc')}
    >
      <Table<McpFunctionDataType>
        options={false}
        search={false}
        fullScreen={false}
        actionRef={actionRef}
        rowKey="functionName"
        request={params => {
          return getFunctionListApi({
            ...params,
            ...paramsRef.current
          });
        }}
        cacheKey="mcp-console-functions"
        toolbar={{
          search: {
            onSearch,
            style: { width: 300 },
            placeholder: t('mcpConsole.Function Name'),
          },
        }}
        columns={[
          {
            dataIndex: "name",
            title: t('mcpConsole.Function Name'),
            render: (val, record) => {
              const url = `/mcp-console/function/${record.functionName}`;
              return <Link to={url} className={styles.func_name}>{val}</Link>
            }
          },
          {
            dataIndex: "mcpType",
            title: t('mcpConsole.type'),
            render: (val) => <Tag className={styles.type_tag}>{val}</Tag>
          },
          {
            dataIndex: "moduleName",
            title: t('mcpConsole.Module/Class'),
            render: (_, record) => {
              return [record.moduleName, record.className].join('/');
            },
          },
          {
            dataIndex: "isAsync",
            title: t('mcpConsole.Async'),
            render: (val) => {
              return val ? 'ASYNC' : 'SYNC';
            },
          },
          {
            dataIndex: "returnType",
            title: t('mcpConsole.Return Type'),
            render: (_, record) => {
              return record.returnType || '-';
            },
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
                  <IconButton
                    icon={EditIcon}
                    onClick={() => navigate(`/mcp-console/function/${record.functionName}`)}
                  />
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
    </ProCard>
  );
};

export default Functions;