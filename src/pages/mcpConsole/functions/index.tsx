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
import { EditIcon, PlayIcon } from '@shopify/polaris-icons';
import { ShopifyButton, TriggerModal } from "@/components";

// 定义函数数据类型
export type FunctionItem = {
  functionName: string;
  type: 'tool' | 'resource';
  moduleClass: string;
  className: string;
  async: 'ASYNC' | 'SYNC';
  returnType: string;
};

// 模拟数据
const mockFunctions: FunctionItem[] = [
  {
    functionName: 'login_user',
    type: 'tool',
    moduleClass: 'auth_service',
    className: 'AuthHandler',
    async: 'ASYNC',
    returnType: 'AuthToken',
  },
  {
    functionName: 'validate_token',
    type: 'tool',
    moduleClass: 'auth_service',
    className: 'TokenManager',
    async: 'SYNC',
    returnType: 'Boolean',
  },
  {
    functionName: 'clean_data',
    type: 'resource',
    moduleClass: 'data_processor',
    className: 'DataCleaner',
    async: 'ASYNC',
    returnType: 'JSON',
  },
  {
    functionName: 'send_email',
    type: 'tool',
    moduleClass: 'notification_center',
    className: 'EmailSender',
    async: 'ASYNC',
    returnType: 'void',
  },
];

const Functions: FC = () => {
  const { modal } = App.useApp();
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();

  const renderEditModal = (
    trigger: ReactElement<any>,
    record?: FunctionItem
  ) => {
    return (
      <TriggerModal
        width={620}
        destroyOnHidden
        trigger={trigger}
        title={`${record ? "Edit" : "Add"} Function`}
      >
        {/* 这里可以替换为实际的表单组件 */}
        <div style={{ padding: '20px' }}>
          <p>Function Form</p>
          <p>Function Name: {record?.functionName}</p>
        </div>
      </TriggerModal>
    );
  };

  const handleExecute = useMemoizedFn((record: FunctionItem) => {
    modal.info({
      title: `Execute Function: ${record.functionName}`,
      content: (
        <div>
          <p>Function Type: {record.type}</p>
          <p>Module: {record.moduleClass}</p>
          <p>Class: {record.className}</p>
          <p>Async: {record.async}</p>
          <p>Return Type: {record.returnType}</p>
        </div>
      ),
      okText: "Execute",
      cancelText: "Cancel",
      onOk: () => {
        console.log('Execute function:', record.functionName);
      },
    });
  });

  return (
    <PageContainer
      className="shopify"
      title="Functions"
      onBack={() => navigate(-1)}
      extra={renderEditModal(
        <ShopifyButton type="primary">Add Function</ShopifyButton>
      )}
    >
      <ProTable<FunctionItem>
        className="shopify"
        actionRef={actionRef}
        rowKey="functionName"
        options={false}
        search={{}}
        pagination={{ showQuickJumper: true }}
        columns={[
          {
            dataIndex: "functionName",
            title: "FUNCTION NAME",
          },
          {
            dataIndex: "type",
            title: "TYPE",
            render: (_, record) => {
              return (
                <span style={{
                  color: record.type === 'tool' ? '#722ed1' : '#fa8c16',
                  fontWeight: 'bold',
                  backgroundColor: record.type === 'tool' ? '#f9f0ff' : '#fff7e6',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {record.type}
                </span>
              );
            },
          },
          {
            dataIndex: "moduleClass",
            title: "MODULE / CLASS",
            render: (_, record) => {
              return (
                <div>
                  <div>{record.moduleClass}</div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.className}</div>
                </div>
              );
            },
          },
          {
            dataIndex: "async",
            title: "ASYNC",
            render: (_, record) => {
              return (
                <span style={{
                  color: '#1890ff',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {record.async}
                </span>
              );
            },
          },
          {
            dataIndex: "returnType",
            title: "RETURN TYPE",
          },
          {
            key: "action",
            title: "ACTIONS",
            width: "120px",
            align: "center",
            fixed: "right",
            render: (_, record) => {
              return (
                <Space>
                  <IconButton
                    icon={PlayIcon}
                    onClick={() => handleExecute(record)}
                    style={{ color: '#52c41a' }}
                  />
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
        request={async (params) => {
          // 这里可以替换为实际的API调用
          console.log('Fetch functions with params:', params);
          return {
            total: mockFunctions.length,
            data: mockFunctions,
          };
        }}
      />
    </PageContainer>
  );
};

export default Functions;