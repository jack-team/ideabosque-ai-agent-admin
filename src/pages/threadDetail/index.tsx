import type { FC } from 'react';
import { useRequest } from 'ahooks';
import SpinBox from '@/components/SpinBox';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreadDetailApi } from '@/services/threads';
import { PageContainer } from '@ant-design/pro-components';
import ThreadDetailContent from './content';

const ThreadDetail: FC = () => {
  const { threadUuid } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useRequest(async () => {
    const result = await getThreadDetailApi({
      threadUuid
    });

    const thread = result.thread || {};
    const messages = (thread.messages || []) as any[];
    const totalTokensUsed = messages.reduce((acc, { message }) => {
      return acc + (message.run.total_tokens || 0)
    }, 0);

    return {
      ...thread,
      messages,
      totalTokensUsed
    };
  });

  return (
    <SpinBox loading={loading}>
      <PageContainer
        className='shopify full-screen'
        title={`Thread: ${threadUuid}`}
        onBack={() => navigate(-1)}
      >
        {!!data && <ThreadDetailContent data={data} />}
      </PageContainer>
    </SpinBox>
  );
}

export default ThreadDetail;