import { App } from 'antd';
import { useParams } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import { useMemoizedFn, useSafeState, useMount } from 'ahooks';
import { queryAgentWorkflowApi } from '@/services/workflow';
import { insertUpdateWorkflowApi } from '@/services/workflow';
import { useFlowInstance } from '@/components/FlowCanvas';
import { ShopifyButton } from '@/components';
import { Spinner } from '@/components';
import SpinBox from '@/components/SpinBox';
import DetailContent from './content';
import styles from './styles.module.less';

type UrlParams = {
  uid: string;
  vid: string;
}

function WorkflowDetail() {
  const { message } = App.useApp();
  const [flow] = useFlowInstance();
  const params = useParams<UrlParams>();
  const [loading, setLoading] = useSafeState(false);
  const [detail, setDetail] = useSafeState<API.Workflow.FlowSnippet>();
  const promptUuid = detail?.promptTemplate?.prompt_uuid

  const fetchData = useMemoizedFn(async () => {
    const result = await queryAgentWorkflowApi({
      flowSnippetUuid: params.uid,
      flowSnippetVersionUuid: params.vid
    });
    setDetail(result.flowSnippet);
  });

  const onSave = useMemoizedFn(async () => {
    const data = flow.getData()!;
    setLoading(true);
    await insertUpdateWorkflowApi({
      ...detail!,
      promptUuid,
      flowContext: JSON.stringify(data.assembleData),
      flowRelationship: JSON.stringify(data.realDetails)
    });
    message.success('Workflow saved successfully');
    setLoading(false);
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
        <ShopifyButton
          type="primary"
          className="shopify"
          onClick={onSave}
        >
          Save
        </ShopifyButton>
      ) : null}
    >
      <SpinBox loading={loading}>
        {detail ? <DetailContent detail={detail} flow={flow} /> : null}
      </SpinBox>
    </PageContainer>
  )
}

export default WorkflowDetail;