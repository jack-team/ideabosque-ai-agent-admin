import dayjs from 'dayjs';
import { Tag } from "antd";
import Table from '@/components/Table';
import { type FC, useRef, Fragment } from 'react';
import { type ActionType } from '@ant-design/pro-components';
import { getFunctionCallListApi } from '@/services/mcpConsole';
import SyntaxHighlighter from 'react-syntax-highlighter';
import type { McpFunctionCallDataType } from '@/typings/mcpConsole';
import { formatDate } from '@/utils';
import styles from './styles.module.less';

type FunctionCallsProps = {
  funcName: string;
}

const FunctionCalls: FC<FunctionCallsProps> = (props) => {
  const { funcName } = props;
  const actionRef = useRef<ActionType>(null);

  return (
    <Table<McpFunctionCallDataType>
      actionRef={actionRef}
      rowKey="mcpFunctionCallUuid"
      options={false}
      search={false}
      fullScreen={false}
      pagination={{ defaultPageSize: 5 }}
      cacheKey={`mcp-console-function-calls-${funcName}`}
      request={params => {
        return getFunctionCallListApi({
          ...params,
          name: funcName
        });
      }}
      columns={[
        {
          dataIndex: "name",
          title: "UUID/Function",
          render: (_, record) => {
            return (
              <Fragment>
                <div>{record.name}</div>
                <div className={styles.sub_name}>
                  {record.mcpFunctionCallUuid}
                </div>
              </Fragment>
            );
          },
        },
        {
          dataIndex: "arguments",
          title: "Arguments",
          render: (json) => {
            const val = (() => {
              try {
                return JSON.stringify(json, null, 2);
              } catch {
                return '-';
              }
            })();
            return (
              <SyntaxHighlighter language="json">
                {val}
              </SyntaxHighlighter>
            );
          },
        },
        {
          dataIndex: "status",
          title: "Status",
          render: (val) => {
            return (
              <Tag className={styles.status_tag}>{val}</Tag>
            )
          },
        },
        {
          dataIndex: "timeSpent",
          title: "Time spent",
          render: (_, record) => {
            return `${record.timeSpent || 0}ms`;
          },
        },
        {
          width: '160px',
          dataIndex: "createdAt",
          title: "Time stamp",
          render: (val) => formatDate(val)
        }
      ]}
      scroll={{ x: "max-content" }}
    />
  );
};

export default FunctionCalls;