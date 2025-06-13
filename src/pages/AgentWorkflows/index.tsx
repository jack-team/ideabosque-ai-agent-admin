import type { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import Workflows from './components/Workflows';

const AgentWorkflows: FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer
      title="Agent workflows"
      className="shopify"
      extra={[
        <Button
          key="1"
          type="primary"
          className="shopify"
          onClick={async () => {
            navigate('/agent-workflows/detail/11223')
          }}
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