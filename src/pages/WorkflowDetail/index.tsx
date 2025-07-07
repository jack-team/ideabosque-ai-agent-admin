import { Button } from 'antd';
import { useParams } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import { useMemoizedFn, useSafeState, useMount } from 'ahooks';
import { queryAgentWorkflow } from '@/services/agent-workflow';
import { Spinner } from '@/components';
import DetailContent from './content';
import styles from './styles.module.less';

type UrlParams = {
  uid: string;
  vid: string;
}

function WorkflowDetail() {
  const params = useParams<UrlParams>();
  const [detail, setDetail] = useSafeState<API.Workflow.FlowSnippet>();

  const fetchData = useMemoizedFn(async () => {
    const result = await queryAgentWorkflow({
      flowSnippetUuid: params.uid,
      flowSnippetVersionUuid: params.vid
    });
    setDetail(result.flowSnippet);
  });

  useMount(fetchData);

  return (
    <PageContainer
      title={detail?.flowName}
      className="shopify full-screen"
      loading={!detail && (
        <div className={styles.loading}>
          <Spinner size={36} />
        </div>
      )}
      extra={detail ? (
        <Button
          type="primary"
          className="shopify"
        >
          Save
        </Button>
      ) : null}
    >
      {detail ? <DetailContent /> : null}
    </PageContainer>
  )
}

export default WorkflowDetail;