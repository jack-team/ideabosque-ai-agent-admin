
import { Space } from 'antd';
import { type FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { ViewIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import { threadListApi } from "@/services/thread";
import type { ThreadDataType } from '@/typings/thread';
import { formatDate } from '@/utils';

const ThreadList: FC = () => {
  const navigate = useNavigate();

  const toDetail = useMemoizedFn((record: ThreadDataType) => {
    navigate(`/thread/detail/${record.threadUuid}`);
  });

  return (
    <PageContainer
      title="Message Threads"
      extra={
        <Button
          className="gray-mode"
          onClick={() => navigate('/thread/async-tasks')}
        >
          Async Tasks
        </Button>
      }
    >
      <Table<ThreadDataType>
        rowKey="threadUuid"
        cacheKey="threads"
        options={false}
        search={false}
        pagination={{
          defaultPageSize: 15
        }}
        columns={[
          {
            title: 'Contact name',
            dataIndex: 'userId'
          },
          {
            title: 'Thread UUID',
            dataIndex: 'threadUuid'
          },
          {
            title: 'Agent',
            key: 'agentUuid',
            render: (_, record) => {
              const agent = record.agent;
              if (!agent) return '-';
              return `${agent.agentName}`;
            }
          },
          {
            dataIndex: "createdAt",
            title: "Created at",
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: "Action",
            width: "100px",
            align: "center",
            hideInSearch: true,
            fixed: "right",
            render: (_, record) => {
              return (
                <Space>
                  <IconButton
                    icon={ViewIcon}
                    onClick={() => toDetail(record)}
                  />
                </Space>
              );
            },
          },
        ]}
        request={threadListApi}
      />
    </PageContainer>
  );
};

export default ThreadList;
