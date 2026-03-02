import { type FC } from 'react';
import PageContainer from '@/components/PageContainer';
import { useParams } from 'react-router';
import { useNavigate } from '@/hooks/useNavigate';
import SpinBox from '@/components/SpinBox';
import { useCoordinationDetail } from '../hooks';
import ReviewAgentContent from './content';
import { useLang } from '@/hooks/useLang';
 
type RouteParams = {
  coordinationUuid: string;
}

const ReviewAgent: FC = () => {
  const { t } = useLang();
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
        fullScreen
        title={t('agent.agentReview')}
        onBack={() => navigate('/agent', { replace: true })}
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