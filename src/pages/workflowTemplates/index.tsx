import dayjs from "dayjs";
import { Space } from "antd";
import { useMemoizedFn } from "ahooks";
import { useNavigate } from "react-router-dom";
import { type FC, cloneElement, useRef } from "react";
import { ShopifyButton, TriggerModal } from "@/components";
import {
  PageContainer,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { queryAgentWorkflowTemplatesApi } from "@/services/workflow";
import { TemplateTypeMap } from "./const";
import CreateForm from "./components/CreateForm";

const AgentTemplates: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);

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
            Mcp Server Management
          </ShopifyButton>
          <ShopifyButton onClick={() => navigate('/workflow-ui-components')}>
            Component Management
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
        actionRef={actionRef}
        options={false}
        search={{
          layout: "vertical",
          optionRender: (_, __, btns) => {
            return btns.map((btn) =>
              // @ts-ignore
              cloneElement(btn, { className: "shopify" })
            );
          },
        }}
        columns={[
          {
            dataIndex: "promptName",
            title: "Template",
            fixed: "left",
          },
          {
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
                  <ShopifyButton
                    type="primary"
                    size="small"
                    onClick={() => toDetail(record)}
                  >
                    Edit
                  </ShopifyButton>
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
