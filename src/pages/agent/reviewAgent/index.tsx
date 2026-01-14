import { type FC } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useParams, useNavigate } from 'react-router';
import SpinBox from '@/components/SpinBox';
import { useCoordinationDetail } from '../hooks';
import ReviewAgentContent from './content';

type RouteParams = {
  coordinationUuid: string;
}

const ReviewAgent: FC = () => {
  const navigate = useNavigate();
  const { coordinationUuid } = useParams<RouteParams>();

  const {
    loading,
    data: coordination,
  } = useCoordinationDetail({
    coordinationUuid: coordinationUuid!
  });

  const agents = coordination?.agents || [];

  return (
    <SpinBox loading={loading}>
      <PageContainer
        title="Agent review"
        className="full-screen"
        onBack={() => navigate(-1)}
      >
        {agents.length > 0 && (
          <ReviewAgentContent
            agents={agents}
            coordinationUuid={coordinationUuid!}
          />
        )}
      </PageContainer>
    </SpinBox>
  );
}

export default ReviewAgent;