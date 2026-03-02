
import qs from 'qs';
import { Space } from 'antd';
import { type FC, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from '@/hooks/useNavigate';
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
import { useLang } from '@/hooks/useLang';
import { formatDate, objectIteration } from '@/utils';
import CreateForm from './createForm';
import Versions from './versions';
import { TemplateTypeMap } from './enum';

const WorkflowTemplates: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload(true);
  });

  const toDetail = useMemoizedFn((record: PromptTemplateDataType, editType = 'new') => {
    const { promptUuid, promptVersionUuid } = record;
    const query = qs.stringify({
      editType,
      promptUuid,
      promptVersionUuid
    });
    navigate(`/workflow/template/detail?${query}`);
  });

  return (
    <PageContainer
      fullScreen
      title={t('workflow.featuredTemplates')}
      onBack={() => navigate('/workflow', { replace: true })}
      extra={
        <Space size={16}>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template/mcp-server')}
          >
            {t('common.mcpServers')}
          </Button>
          <Button
            className="gray-mode"
            onClick={() => navigate('/workflow/template/ui-component')}
          >
            {t('common.components')}
          </Button>
          <TriggerModal
            width={400}
            title={t('workflow.createTemplate')}
            trigger={
              <Button type="primary">
                {t('workflow.createTemplate')}
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
        cacheKey="WorkflowTemplates"
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
            title: t('workflow.template'),
            fixed: "left",
          },
          {
            hideInSearch: true,
            dataIndex: "promptType",
            title: t('flowCanvas.type'),
            valueEnum: objectIteration(TemplateTypeMap, t)
          },
          {
            dataIndex: "promptDescription",
            title: t('flowCanvas.description'),
            hideInSearch: true,
          },
          {
            dataIndex: "updatedAt",
            title: t('common.updatedAt'),
            hideInSearch: true,
            render: (val) => formatDate(val)
          },
          {
            dataIndex: "updatedBy",
            title: t('common.updatedBy'),
            hideInSearch: true,
          },
          {
            key: "action",
            title: t('common.actions'),
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
                    title={t('common.versions')}
                    okText={t('common.apply')}
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
