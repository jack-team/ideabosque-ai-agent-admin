import { type FC, useRef } from 'react';
import { Space, Button, App } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ProTable, type ActionType } from '@ant-design/pro-components';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { WizardTypesMap } from '@/constants/map';
import EditFrom from './components/EditForm';
import { getElementsApi, deleteElementApi } from '@/services/wizard';

const Elements: FC = () => {
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
          await deleteElementApi({
            elementUuid: record.elementUuid
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
      title="UI Blocks / Elements"
      onBack={() => navigate(-1)}
      extra={
        <TriggerModal
          width={600}
          className="shopify"
          title="Create new element"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Create new element
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
        scroll={{
          x: 'max-content'
        }}
        rowKey="elementUuid"
        className="shopify"
        request={async (params) => {
          const {
            current,
            pageSize,
            ...rest
          } = params;

          const {
            elementList: result
          } = await getElementsApi({
            limit: pageSize,
            pageNumber: current,
            ...rest
          });

          return {
            total: result.total,
            data: result.elementList
          }
        }}
        columns={[
          {
            title: 'Element Name',
            dataIndex: 'elementTitle'
          },
          {
            title: 'Element UUID',
            dataIndex: 'elementUuid',
            hideInSearch: true
          },
          {
            title: 'Data Type',
            dataIndex: 'dataType',
            valueEnum: WizardTypesMap
          },
          {
            hideInSearch: true,
            title: 'Priority',
            dataIndex: 'priority'
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
                    title="Element Details"
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

export default Elements;