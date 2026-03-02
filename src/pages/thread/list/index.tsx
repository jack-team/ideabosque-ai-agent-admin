
import { Space } from 'antd';
import { type FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from '@/hooks/useNavigate';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { ViewIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import { threadListApi } from "@/services/thread";
import type { ThreadDataType } from '@/typings/thread';
import { formatDate } from '@/utils';
import { useLang } from '@/hooks/useLang';

const ThreadList: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  const toDetail = useMemoizedFn((record: ThreadDataType) => {
    navigate(`/thread/detail/${record.threadUuid}`);
  });

  return (
    <PageContainer
      fullScreen
      title={t('thread.Message Threads')}
      extra={
        <Button
          className="gray-mode"
          onClick={() => navigate('/thread/async-tasks')}
        >
          {t('thread.Async Tasks')}
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
            title: t('thread.Contact name'),
            dataIndex: 'userId'
          },
          {
            title: t('thread.Thread UUID'),
            dataIndex: 'threadUuid'
          },
          {
            title: t('thread.Agent'),
            key: 'agentUuid',
            render: (_, record) => {
              const agent = record.agent;
              if (!agent) return '-';
              return `${agent.agentName}`;
            }
          },
          {
            dataIndex: "createdAt",
            title: t('common.createdAt'),
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: t('common.actions'),
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
