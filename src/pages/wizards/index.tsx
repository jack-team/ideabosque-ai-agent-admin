import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import { WizardTypesMap } from '@/constants/map';
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
        className: 'shopify'
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
      title="Wizard List"
      onBack={() => navigate(-1)}
      extra={
        <Space size={16}>
          <Button
            className="shopify"
            onClick={() => navigate('/elements')}
          >
            Elements
          </Button>
          <TriggerModal
            width={600}
            className="shopify"
            title="Create Wizard"
            trigger={
              <Button
                className="shopify"
                type="primary"
              >
                Create Wizard
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
            title: 'Wizard UUID',
            dataIndex: 'wizardUuid',
            hideInSearch: true
          },
          {
            title: 'Wizard Title',
            dataIndex: 'wizardTitle'
          },
           {
            title: 'Wizard Type',
            dataIndex: 'wizardType',
            valueEnum: WizardTypesMap
          },
          {
            width: '300px',
            hideInSearch: true,
            title: 'Wizard Description',
            dataIndex: 'wizardDescription'
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
                    title="Update Wizard"
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
                    onClick={() => handleDel(record)}
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

export default Wizards;