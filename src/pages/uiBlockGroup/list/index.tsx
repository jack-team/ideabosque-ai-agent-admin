
import { Space, App } from 'antd';
import { type FC, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import { type ActionType } from "@ant-design/pro-components";
import PageContainer from '@/components/PageContainer';
import { wizardGroupListApi, deleteWizardGroupApi } from "@/services/wizardGroup";
import type { WizardGroupResultType } from '@/typings/wizardGroup';
import { StatusEnum } from '@/constants/enum';
import { formatDate } from '@/utils';
import CreateForm from './createForm';

const WorkflowTemplates: FC = () => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const toDetail = useMemoizedFn((record: WizardGroupResultType) => {
    navigate(`/ui-block-group/${record.wizardGroupUuid}`);
  });

  const handleArchive = useMemoizedFn((record: WizardGroupResultType) => {
    modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Delete',
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
    });
  });

  return (
    <PageContainer
      title="UI Block Groups"
      extra={
        <TriggerModal
          title="Create new UI Block Group"
          trigger={
            <Button type="primary">
              Create new UI Block Group
            </Button>
          }
        >
          <CreateForm onSuccess={toDetail} />
        </TriggerModal>
      }
    >
      <Table<WizardGroupResultType>
        rowKey="wizardGroupUuid"
        actionRef={actionRef}
        options={false}
        search={false}
        pagination={{
          defaultPageSize: 15
        }}
        columns={[
          {
            width: '25%',
            dataIndex: "wizardGroupName",
            title: "UI Block Group name",
          },
          {
            dataIndex: "wizardGroupUuid",
            title: "UI Block Group UUID",
            hideInSearch: true,
          },
          {
            dataIndex: "createdAt",
            title: "Created at",
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            dataIndex: "updatedAt",
            title: "Last updated",
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            key: "action",
            title: "Action",
            width: "100px",
            align: "center",
            hideInSearch: true,
            fixed: "right",
            render: (_, record) => {
              return (
                <Space>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => toDetail(record)}
                  />
                  <IconButton
                    icon={DeleteIcon}
                    onClick={() => handleArchive(record)}
                  />
                </Space>
              );
            },
          },
        ]}
        request={async (params) => {
          return wizardGroupListApi({
            ...params,
            statuses: [StatusEnum.Active],
          })
        }}
      />
    </PageContainer>
  );
};

export default WorkflowTemplates;
