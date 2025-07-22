import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import { TriggerModal, ShopifyButton } from '@/components';
import Workflows from './components/Workflows';
import CreateWorkflowForm from './components/CreateForm';

const AgentWorkflows: FC = () => {
  const navigate = useNavigate();

  const toDetailPage = useMemoizedFn((record: API.Workflow.FlowSnippet) => {
    const { flowSnippetUuid: uid, flowSnippetVersionUuid: vid } = record;
    navigate(`/agent-workflows/detail/${uid}/${vid}`);
  });

  return (
    <PageContainer
      title="Agent workflows"
      className="shopify"
      extra={[
        <ShopifyButton
          key="mange"
          onClick={() => navigate('/workflow-templates')}
        >
          Template Management
        </ShopifyButton>,
        <TriggerModal
          key="add"
          width={400}
          destroyOnHidden
          title="Create workflow"
          okText="Create"
          trigger={
            <ShopifyButton type="primary">
              Create workflow
            </ShopifyButton>
          }
        >
          <CreateWorkflowForm onSuccess={toDetailPage} />
        </TriggerModal>
      ]}
    >
      <Workflows onEdit={toDetailPage} />
    </PageContainer>
  );
}

export default AgentWorkflows;