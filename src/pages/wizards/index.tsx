import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import EditFrom from './components/EditForm';
import { getWizardListApi, deleteWizardApi } from '@/services/wizard';

const Wizards: FC = () => {
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
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
          await deleteWizardApi({
            wizardUuid: record.wizardUuid
          });
          onRefresh();
          message.success('Deletion successful.');
        } catch (err) {
          message.success('Deletion failed.');
          return Promise.reject(err);
        }
      }
    })
  })

  return (
    <PageContainer
      title="UI Blocks"
      onBack={() => navigate(-1)}
      extra={
        <Space size={16}>
          <Button
            className="shopify gray"
            onClick={() => navigate('/elements')}
          >
            Elements
          </Button>
          <TriggerModal
            width={600}
            className="shopify"
            title="Create new UI Block"
            trigger={
              <Button
                className="shopify"
                type="primary"
              >
                Create new UI Block
              </Button>
            }
          >
            <EditFrom />
          </TriggerModal>
        </Space>
      }
    >
      <ProTable
        actionRef={ref}
        search={false}
        options={false}
        scroll={{
          x: 'max-content'
        }}
        rowKey="wizardUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            wizardList: result
          } = await getWizardListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.wizardList
          }
        }}
        columns={[
          {
            title: 'UI Block Name',
            dataIndex: 'wizardTitle'
          },
          {
            title: 'UI Block UUID',
            dataIndex: 'wizardUuid',
            hideInSearch: true
          },
          {
            title: 'Priority',
            dataIndex: 'priority',
            hideInSearch: true
          },
          {
            title: 'Create at',
            dataIndex: 'createdAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.createdAt)
          },
          {
            title: 'Last updated',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.updatedAt)
          },
          {
            width: '120px',
            key: 'action',
            title: 'Action',
            align: 'center',
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={600}
                    destroyOnHidden
                    className="shopify"
                    title="UI Block  Details"
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

export default Wizards;