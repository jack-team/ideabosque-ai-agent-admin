import dayjs from 'dayjs';
import cloneDeep from 'clone-deep';
import { useMemoizedFn } from 'ahooks';
import { type FC, useRef, cloneElement } from 'react';
import { Space, Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, PageContainer, type ActionType } from '@ant-design/pro-components';
import TriggerModal from '@/components/TriggerModal';
import EditForm from './components/EditForm';
import { getLlmListApi, deleteLlmApi } from '@/services/llm';

const EditFromWidth = 600;

const Llm: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const onDelete = useMemoizedFn(async (row: Record<string, any>) => {
    try {
      await deleteLlmApi({
        llmName: row.llmName,
        llmProvider: row.llmProvider
      });
      onRefresh();
      message.success('Deleted successfully.');
    } catch (err) {
      message.error('Deleted failed.');
    }
  });

  return (
    <PageContainer
      className="shopify"
      title="AI Core Engine -> llm"
    >
      <ProTable
        className="shopify"
        actionRef={actionRef}
        rowKey="moduleName"
        options={false}
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
            llmList: result
          } = await getLlmListApi({
            ...rest,
            limit,
            pageNumber,
          });

          return {
            total: result.total,
            data: result.llmList
          }
        }}
        toolbar={{
          actions: [
            <TriggerModal
              key="add"
              okText="Save"
              title="Add Llm"
              width={EditFromWidth}
              trigger={
                <Button
                  type="primary"
                  children="Add"
                  icon={<PlusOutlined />}
                  className="shopify"
                />
              }
            >
              <EditForm onSuccess={onRefresh} />
            </TriggerModal>
          ]
        }}
        columns={[
          {
            title: 'Llm Provider',
            dataIndex: 'llmProvider'
          },
          {
            title: 'Llm Name',
            dataIndex: 'llmName',
            hideInSearch: true
          },
          {
            title: 'Module Name',
            dataIndex: 'moduleName',
            hideInSearch: true
          },

          {
            title: 'Class Name',
            dataIndex: 'className',
            hideInSearch: true
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
                    title="Edit Llm"
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
                    onConfirm={() => onDelete(record)}
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

export default Llm;