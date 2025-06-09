import type { FC } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import Workflows from './components/Workflows';

const AgentWorkflows: FC = () => {
  return (
    <PageContainer
      title="Agent workflows"
      className="shopify"
      extra={[
        <Button
          key="1"
          type="primary"
          className="shopify"
        >
          Create workflow
        </Button>
      ]}
    >
      <Workflows />
    </PageContainer>
  );
}

export default AgentWorkflows;