import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getQuestionGroupListApi, deleteQuestionGroupApi } from '@/services/question';

const Agents: FC = () => {
  const { modal, message } = App.useApp();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  const handleDel = useMemoizedFn((record: Record<string, any>) => {
    modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Delete',
      okButtonProps: {
        danger: true,
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify gray'
      },
      onOk: async () => {
        try {
          await deleteQuestionGroupApi({
            questionGroupUuid: record.questionGroupUuid
          });
          onRefresh();
          message.success('Deletion successful.');
        } catch (err) {
          message.success('Deletion failed.');
          return Promise.reject(err);
        }
      }
    })
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
          <EditFrom onSuccess={onRefresh} />
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
                    width={620}
                    destroyOnHidden
                    className="shopify"
                    title="Edit Question Groups"
                    trigger={<IconButton icon={EditIcon} />}
                  >
                    <EditFrom
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleDel(record)}
                  />
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