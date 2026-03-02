import type { FC } from 'react';
import * as uuid from 'uuid';
import { useRequest } from 'ahooks';
import SpinBox from '@/components/SpinBox';
import { useParams } from 'react-router-dom';
import { useNavigate } from '@/hooks/useNavigate';
import PageContainer from '@/components/PageContainer';
import { threadApi } from '@/services/thread';
import { useLang } from '@/hooks/useLang';
import ThreadDetailContent from './content';

const ThreadDetail: FC = () => {
  const { t } = useLang();
  const { threadUuid } = useParams<{ threadUuid: string }>();
  const navigate = useNavigate();

  const { loading, data } = useRequest(async () => {
    const thread = await threadApi({ threadUuid: threadUuid! });

    const messages = thread?.messages?.map(item =>
      ({ ...item, msgId: uuid.v4() })) || [];

    const totalTokensUsed = messages.reduce((acc, item) => {
      return acc + (item?.message?.run?.totalTokens || 0)
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
        title={`${t('thread.Thread')}: ${threadUuid}`}
        onBack={() => navigate('/thread', { replace: true })}
      >
        {!!data && <ThreadDetailContent data={data} />}
      </PageContainer>
    </SpinBox>
  );
}

export default ThreadDetail;