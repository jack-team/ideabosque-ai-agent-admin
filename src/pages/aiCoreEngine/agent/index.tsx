import dayjs from 'dayjs';
import cloneDeep from 'clone-deep';
import { type FC, useRef, cloneElement } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Space, Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, type ActionType, PageContainer } from '@ant-design/pro-components';
import TriggerModal from '@/components/TriggerModal';
import EditForm from './components/EditForm';
import { getAgentListApi } from '@/services/agent';

const EditFromWidth = 600;

const Questions: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

   //@ts-ignore
  const onDelete = useMemoizedFn(async (questionUuid: string) => {
    try {
      // await deleteQuestionApi({ questionUuid });
      onRefresh();
      message.success('Deleted successfully.');
    } catch (err) {
      message.error('Deleted failed.');
    }
  });

  return (
    <PageContainer className="shopify">
      <ProTable
        options={false}
        actionRef={actionRef}
        className="shopify"
        rowKey="agentVersionUuid"
        search={{
          labelWidth: 'auto',
          optionRender: (_, __, doms) => (
            // @ts-ignore
            doms.map(dom => cloneElement(dom, {
              className: 'shopify'
            }))
          )
        }}
        scroll={{ x: 'max-content' }}
        request={async (params) => {
          const {
            pageSize: limit,
            current: pageNumber,
            ...rest
          } = params;

          const {
            agentList: result
          } = await getAgentListApi({
            ...rest,
            limit,
            pageNumber,
            statuses: ['active']
          });

          return {
            total: result.total,
            data: result.agentList
          }
        }}
        toolbar={{
          actions: [
            <TriggerModal
              key="add"
              okText="Save"
              title="Add Agent"
              width={EditFromWidth}
              trigger={
                <Button
                  type="primary"
                  children="Add"
                  className="shopify"
                  icon={<PlusOutlined />}
                />
              }
            >
              <EditForm onSuccess={onRefresh} />
            </TriggerModal>
          ]
        }}
        columns={[
          {
            title: 'Agent Name',
            dataIndex: 'agentName',
            hideInSearch: false
          },
          {
            title: 'Agent Uuid',
            dataIndex: 'agentUuid',
            hideInSearch: false
          },
          {
            title: 'Status',
            dataIndex: 'status',
            hideInSearch: true
          },
          {
            title: 'Llm Provider',
            dataIndex: 'llm_provider',
            hideInSearch: true,
            render: (_, row) => {
              return row.llm.llm_provider;
            }
          },
          {
            title: 'Llm Name',
            dataIndex: 'llm_name',
            hideInSearch: true,
            render: (_, row) => {
              return row.llm.llm_name;
            }
          },
          {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => {
              return dayjs(record.updatedAt).
                format('YYYY/MM/DD HH:mm:ss');
            }
          },
          {
            title: 'Updated By',
            dataIndex: 'updatedBy',
            hideInSearch: true
          },
          {
            fixed: 'right',
            width: 100,
            title: 'Actions',
            dataIndex: 'actions',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space size={16}>
                  <TriggerModal
                    key="add"
                    okText="Save"
                    width={EditFromWidth}
                    title="Edit Agent"
                    trigger={<a>Edit</a>}
                  >
                    <EditForm
                      insert={false}
                      onSuccess={onRefresh}
                      formData={cloneDeep(record)}
                    />
                  </TriggerModal>
                  <Popconfirm
                    okText="Delete"
                    okType="danger"
                    title="Are you sure you want to delete it?"
                    onConfirm={() => onDelete(record.questionUuid)}
                  >
                    <a className="danger">Delete</a>
                  </Popconfirm>
                </Space>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
};

export default Questions;