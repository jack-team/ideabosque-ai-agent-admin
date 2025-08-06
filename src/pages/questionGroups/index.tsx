import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getQuestionGroupListApi } from '@/services/question';

const Agents: FC = () => {
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  const handleArchive = useMemoizedFn((record: Record<string, any>) => {
    
  });

  return (
    <PageContainer
      title="Question Groups"
      extra={
        <TriggerModal
          width={600}
          className="shopify"
          title="Create Question Group"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Create Question group
            </Button>
          }
        >
          <EditFrom />
        </TriggerModal>
      }
    >
      <ProTable
        actionRef={ref}
        search={false}
        options={false}
        rowKey="questionGroupUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            questionGroupList: result
          } = await getQuestionGroupListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.questionGroupList
          }
        }}
        columns={[
          {
            title: 'Question Group UUID',
            dataIndex: 'questionGroupUuid'
          },
          {
            title: 'Question Group Name',
            dataIndex: 'questionGroupName'
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.createdAt)
          },
          {
            title: 'Update at',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.updatedAt)
          },
          {
            width: '120px',
            key: 'action',
            title: 'Action',
            align: 'center',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={600}
                    destroyOnHidden
                    className="shopify"
                    title="Edit Question Groups"
                    trigger={
                      <Button
                        size="small"
                        type="primary"
                        className="shopify"
                      >
                        Edit
                      </Button>
                    }
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <Button
                    danger
                    size="small"
                    className="shopify"
                    onClick={() => handleArchive(record)}
                  >
                    Delete
                  </Button>
                </Space>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default Agents;