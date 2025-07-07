import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { TriggerModal, ShopifyButton } from '@/components';
import Workflows from './components/Workflows';
import CreateWorkflowForm from './components/CreateForm';

const AgentWorkflows: FC = () => {

  return (
    <PageContainer
      title="Agent workflows"
      className="shopify"
      extra={[
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
          <CreateWorkflowForm />
        </TriggerModal>
      ]}
    >
      <Workflows />
    </PageContainer>
  );
}

export default AgentWorkflows;