import { type FC } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import FlowCanvas from '@/components/FlowCanvas';

const Test: FC = () => {
  return (
    <PageContainer
      title="Workflow Canvas"
      className="shopify full-screen"
    >
      <FlowCanvas />
    </PageContainer>
  )
}

export default Test;