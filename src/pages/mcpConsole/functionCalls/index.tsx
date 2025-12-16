import dayjs from "dayjs";
import { type FC, useRef } from "react";
import { useNavigate } from 'react-router';
import { App } from "antd";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { CheckCircleFilled, LoadingOutlined, CloseCircleFilled } from '@ant-design/icons';

// 定义函数调用数据类型
export type FunctionCallItem = {
  functionName: string;
  uuid: string;
  arguments: string;
  status: 'Success' | 'Running' | 'Failed';
  timeSpent: string;
  timestamp: string;
};

// 模拟数据
const mockFunctionCalls: FunctionCallItem[] = [
  {
    functionName: 'login_user',
    uuid: 'uuid_1',
    arguments: '{ "user": "admin" }',
    status: 'Success',
    timeSpent: '120ms',
    timestamp: dayjs().subtract(10, 'minute').toISOString(),
  },
  {
    functionName: 'clean_data',
    uuid: 'uuid_2',
    arguments: '{ "source": "s3://..." }',
    status: 'Running',
    timeSpent: '4.5s',
    timestamp: dayjs().subtract(5, 'minute').toISOString(),
  },
  {
    functionName: 'send_email',
    uuid: 'uuid_3',
    arguments: '{ "to": "user@example.com", "subject": "Test" }',
    status: 'Failed',
    timeSpent: '500ms',
    timestamp: dayjs().subtract(3, 'minute').toISOString(),
  },
];

const FunctionCalls: FC = () => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();

  const handleViewDetails = useMemoizedFn((record: FunctionCallItem) => {
    modal.info({
      title: `Function Call Details: ${record.functionName}`,
      content: (
        <div>
          <p>UUID: {record.uuid}</p>
          <p>Arguments: {record.arguments}</p>
          <p>Status: {record.status}</p>
          <p>Time Spent: {record.timeSpent}</p>
          <p>Timestamp: {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      ),
      okText: "OK",
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
        rowKey="uuid"
        options={false}
        search={{}}
        pagination={{ showQuickJumper: true }}
        columns={[
          {
            dataIndex: "functionName",
            title: "UUID / FUNCTION",
            render: (_, record) => {
              return (
                <div>
                  <div>{record.functionName}</div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.uuid}</div>
                </div>
              );
            },
          },
          {
            dataIndex: "arguments",
            title: "ARGUMENTS",
            render: (_, record) => {
              return (
                <div style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
                  {record.arguments}
                </div>
              );
            },
          },
          {
            dataIndex: "status",
            title: "STATUS",
            render: (_, record) => {
              let icon, color;
              switch (record.status) {
                case 'Success':
                  icon = <CheckCircleFilled />;
                  color = '#52c41a';
                  break;
                case 'Running':
                  icon = <LoadingOutlined spin />;
                  color = '#1890ff';
                  break;
                case 'Failed':
                  icon = <CloseCircleFilled />;
                  color = '#f5222d';
                  break;
              }
              return (
                <span style={{ color, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {icon}
                  {record.status}
                </span>
              );
            },
          },
          {
            dataIndex: "timeSpent",
            title: "TIME SPENT",
          },
          {
            dataIndex: "timestamp",
            title: "TIMESTAMP",
            render: (_, record) => {
              return dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss');
            },
          },
          {
            key: "action",
            title: "VIEW DETAILS",
            width: "120px",
            align: "center",
            fixed: "right",
            render: (_, record) => {
              return (
                <a onClick={() => handleViewDetails(record)} style={{ color: '#1890ff' }}>
                  View
                </a>
              );
            },
          },
        ]}
        scroll={{ x: "max-content" }}
        request={async (params) => {
          // 这里可以替换为实际的API调用
          console.log('Fetch function calls with params:', params);
          return {
            total: mockFunctionCalls.length,
            data: mockFunctionCalls,
          };
        }}
      />
    </PageContainer>
  );
};

export default FunctionCalls;