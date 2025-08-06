import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { getWizardGroupListApi, deleteWizardGroupApi } from '@/services/wizard';

const WizardGroups: FC = () => {
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
  const ref = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    ref.current?.reload();
  });

  const handleArchive = useMemoizedFn((record: Record<string, any>) => {
    modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Delete',
      okButtonProps: {
        danger: true,
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify'
      },
      onOk: async () => {
        try {
          await deleteWizardGroupApi({
            wizardGroupUuid: record.wizardGroupUuid
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
      title="Wizard Groups"
      extra={
        <Space size={16}>
          <Button
            className="shopify"
            onClick={() => navigate('/wizards')}
          >
            Wizards
          </Button>
          <TriggerModal
            width={600}
            className="shopify"
            title="Create Wizard Group"
            trigger={
              <Button
                className="shopify"
                type="primary"
              >
                Create Wizard Group
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
        rowKey="agentUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            wizardGroupList: result
          } = await getWizardGroupListApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.wizardGroupList
          }
        }}
        columns={[
          {
            title: 'Wizard Group UUID',
            dataIndex: 'wizardGroupUuid',
            hideInSearch: true
          },
          {
            title: 'Wizard Group Name',
            dataIndex: 'wizardGroupName'
          },
          {
            hideInSearch: true,
            title: 'Wizard Group Description',
            dataIndex: 'wizardGroupDescription'
          },
          {
            title: 'Weight',
            dataIndex: 'weight',
            hideInSearch: true,
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
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              return (
                <Space>
                  <TriggerModal
                    width={600}
                    destroyOnHidden
                    className="shopify"
                    title="Create agent"
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

export default WizardGroups;