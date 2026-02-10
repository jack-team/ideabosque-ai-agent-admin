import { App, Tag, Space } from "antd";
import { useMemoizedFn } from "ahooks";
import { type FC, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Table from "@/components/Table";
import { useConfirm } from '@/hooks/useConfirm';
import IconButton from '@/components/IconButton';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { type ActionType, ProCard } from "@ant-design/pro-components";
import { getFunctionListApi, deleteMcpFunctionApi } from "@/services/mcpConsole";
import type { McpFunctionDataType } from '@/typings/mcpConsole';
import { formatDate } from '@/utils';
import styles from './styles.module.less';

const Functions: FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);
  const paramsRef = useRef<Record<string, any>>(null);
  const [confirm] = useConfirm();

  const refreshTable = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const handleDelete = useMemoizedFn((record: McpFunctionDataType) => {
    confirm({
      title: 'Are you sure you want to delete this function?',
      okText: 'Delete',
      async onConfirm() {
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

  const onSearch = useMemoizedFn((val: string) => {
    paramsRef.current = { functionName: val };
    refreshTable();
  });

  return (
    <ProCard
      title="Functions"
      subTitle="These are functions using the data from the Connection Modules. These are to perform action tasks within the Workflows."
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
            placeholder: 'Function Name',
          },
        }}
        columns={[
          {
            dataIndex: "name",
            title: "Function Name",
            render: (val, record) => {
              const url = `/mcp-console/function/${record.functionName}`;
              return <Link to={url} className={styles.func_name}>{val}</Link>
            }
          },
          {
            dataIndex: "mcpType",
            title: "Type",
            render: (val) => <Tag className={styles.type_tag}>{val}</Tag>
          },
          {
            dataIndex: "moduleName",
            title: "Module/Class",
            render: (_, record) => {
              return [record.moduleName, record.className].join('/');
            },
          },
          {
            dataIndex: "isAsync",
            title: "Async",
            render: (val) => {
              return val ? 'ASYNC' : 'SYNC';
            },
          },
          {
            dataIndex: "returnType",
            title: "Return Type",
            render: (_, record) => {
              return record.returnType || '-';
            },
          },
          {
            dataIndex: "updatedAt",
            title: "Last Updated",
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: "Actions",
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