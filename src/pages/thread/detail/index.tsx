import type { FC } from 'react';
import { useRequest } from 'ahooks';
import SpinBox from '@/components/SpinBox';
import { useParams, useNavigate } from 'react-router-dom';
import { threadApi } from '@/services/thread';
import { PageContainer } from '@ant-design/pro-components';
import ThreadDetailContent from './content';

const ThreadDetail: FC = () => {
  const { threadUuid } = useParams<{ threadUuid: string }>();
  const navigate = useNavigate();

  const { loading, data } = useRequest(async () => {
    const thread = await threadApi({ threadUuid: threadUuid! });
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
        title={`Thread: ${threadUuid}`}
        onBack={() => navigate(-1)}
      >
        {!!data && <ThreadDetailContent data={data} />}
      </PageContainer>
    </SpinBox>
  );
}

export default ThreadDetail;