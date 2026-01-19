
import qs from 'qs';
import { Space } from 'antd';
import { type FC, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import { EditIcon, DuplicateIcon } from '@shopify/polaris-icons';
import { type ActionType } from "@ant-design/pro-components";
import PageContainer from '@/components/PageContainer';
import { promptTemplateListApi } from "@/services/workflow";
import type { PromptTemplateDataType } from '@/typings/workflow';
import { StatusEnum } from '@/constants/enum';
import { formatDate } from '@/utils';
import CreateForm from './createForm';
import Versions from './versions';
import { TemplateTypeMap } from './enum';

const WorkflowTemplates: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const toDetail = useMemoizedFn((record: PromptTemplateDataType, editType = 'new') => {
    const { promptUuid, promptVersionUuid } = record;
    const query = qs.stringify({
      editType,
      promptUuid,
      promptVersionUuid
    });
    navigate(`/workflow-template/detail?${query}`);
  });

  return (
    <PageContainer
      title="Featured templates"
      onBack={() => navigate(-1)}
      extra={
        <Space size={16}>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template/mcp-server')}
          >
            Mcp Servers
          </Button>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template/ui-component')}
          >
            Components
          </Button>
          <TriggerModal
            width={400}
            title="Create template"
            trigger={
              <Button type="primary">
                Create Template
              </Button>
            }
          >
            <CreateForm onSaveSuccess={toDetail} />
          </TriggerModal>
        </Space>
      }
    >
      <Table<PromptTemplateDataType>
        className="shopify"
        rowKey="promptUuid"
        actionRef={actionRef}
        options={false}
        search={false}
        pagination={{
          defaultPageSize: 20
        }}
        columns={[
          {
            width: '25%',
            dataIndex: "promptName",
            title: "Template",
            fixed: "left",
          },
          {
            hideInSearch: true,
            dataIndex: "promptType",
            title: "Type",
            valueEnum: TemplateTypeMap
          },
          {
            dataIndex: "promptDescription",
            title: "Description",
            hideInSearch: true,
          },
          {
            dataIndex: "updatedAt",
            title: "Updated at",
            hideInSearch: true,
            render: (val) => formatDate(val),
          },
          {
            dataIndex: "updatedBy",
            title: "Updated by",
            hideInSearch: true,
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
                    onClick={() => toDetail(record, 'update')}
                  />
                  <TriggerModal
                    width={400}
                    title="Versions"
                    okText="Apply"
                    trigger={<IconButton icon={DuplicateIcon} />
                    }
                  >
                    <Versions
                      workflow={record}
                      onSaveSuccess={onRefresh}
                    />
                  </TriggerModal>
                </Space>
              );
            },
          },
        ]}
        request={async (params) => {
          return promptTemplateListApi({
            ...params,
            statuses: [StatusEnum.Active],
          })
        }}
      />
    </PageContainer>
  );
};

export default WorkflowTemplates;
