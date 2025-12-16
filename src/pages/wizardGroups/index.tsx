import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
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

  const toDetail = useMemoizedFn((uid) => {
    navigate(`/wizard-group/${uid}`);
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
        className: 'shopify gray'
      },
      onOk: async () => {
        try {
          await deleteWizardGroupApi({
            wizardGroupUuid: record.wizardGroupUuid
          });
          onRefresh();
          message.success('Deletion successful.');
        } catch (err) {
          message.error('Deletion failed.');
          return Promise.reject(err);
        }
      }
    })
  })

  return (
    <PageContainer
      title="UI Block Groups"
      extra={
        <Space size={16}>
          <Button
            className="shopify gray"
            onClick={() => navigate('/wizards')}
          >
            Blocks
          </Button>
          <TriggerModal
            width={600}
            className="shopify"
            title="Create new UI Block Group"
            trigger={
              <Button
                className="shopify"
                type="primary"
              >
                Create new UI Block Group
              </Button>
            }
          >
            <EditFrom onSuccess={onRefresh}/>
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
        rowKey="wizardGroupUuid"
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
            title: 'UI Block Group name',
            dataIndex: 'wizardGroupName'
          },
          {
            title: 'UI Block Group UUID',
            dataIndex: 'wizardGroupUuid',
            hideInSearch: true
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
            title: 'Last updated',
            dataIndex: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => formatDate(record.updatedAt)
          },
          {
            width: '100px',
            key: 'action',
            title: 'Action',
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              const uid = record.wizardGroupUuid;
              return (
                <Space>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => toDetail(uid)}
                  />
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleArchive(record)}
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

export default WizardGroups;