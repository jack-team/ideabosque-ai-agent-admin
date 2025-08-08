import dayjs from "dayjs";
import { Space, Button } from "antd";
import { type FC, useRef } from "react";
import { useMemoizedFn } from "ahooks";
import { useNavigate } from "react-router-dom";
import { ShopifyButton, TriggerModal } from "@/components";
import { PageContainer, ProTable, type ActionType } from "@ant-design/pro-components";
import { queryAgentWorkflowTemplatesApi } from "@/services/workflow";
import { TemplateTypeMap } from "./const";
import { StatusEnum } from '@/constants/enum';
import CreateForm from "./components/CreateForm";
import VersionForm from "./components/VersionForm";

const AgentTemplates: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const toDetail = useMemoizedFn((record: API.Workflow.PromptTemplateItem) => {
    const { promptUuid: uid, promptVersionUuid: vid } = record;
    navigate(`/workflow-templates/detail/${uid}/${vid}`, { state: record });
  });

  return (
    <PageContainer
      className="shopify"
      title="Workflow Templates"
      extra={
        <Space size={16}>
          <ShopifyButton onClick={() => navigate('/workflow-mcp-servers')}>
            Mcp Servers
          </ShopifyButton>
          <ShopifyButton onClick={() => navigate('/workflow-ui-components')}>
            Components
          </ShopifyButton>
          <TriggerModal
            width={400}
            destroyOnHidden
            title="Create template"
            trigger={
              <ShopifyButton type="primary">Create Template</ShopifyButton>
            }
          >
            <CreateForm onSuccess={toDetail} />
          </TriggerModal>
        </Space>
      }
    >
      <ProTable<API.Workflow.PromptTemplateItem>
        className="shopify"
        rowKey="promptUuid"
        actionRef={actionRef}
        options={false}
        search={false}
        columns={[
          {
            dataIndex: "promptName",
            title: "Template",
            fixed: "left",
          },
          {
            hideInSearch: true,
            dataIndex: "promptType",
            title: "Type",
            valueEnum: TemplateTypeMap,
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
            render: (_, record) => {
              return dayjs(record.updatedAt).format("YYYY/MM/DD HH:mm:ss");
            },
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
                  <Button
                    size="small"
                    type="primary"
                    className="shopify"
                    onClick={() => toDetail(record)}
                  >
                    Edit
                  </Button>
                  <TriggerModal
                    width={400}
                    title="Versions"
                    destroyOnHidden
                    okText="Apply"
                    trigger={
                      <Button
                        size="small"
                        className="shopify"
                      >
                        Versions
                      </Button>
                    }
                  >
                    <VersionForm
                      formData={record}
                      onSuccess={onRefresh}
                    />
                  </TriggerModal>
                </Space>
              );
            },
          },
        ]}
        scroll={{ x: "max-content" }}
        request={async (params) => {
          const { current = 1, pageSize = 10, ...reset } = params;

          const { promptTemplateList: result } =
            await queryAgentWorkflowTemplatesApi({
              pageNumber: current,
              limit: pageSize,
              statuses: [StatusEnum.Active],
              ...reset,
            });
          return {
            total: result.total,
            data: result.promptTemplateList,
          };
        }}
      />
    </PageContainer>
  );
};

export default AgentTemplates;
