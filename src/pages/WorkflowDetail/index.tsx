import { App } from 'antd';
import { useParams, useSearchParams } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import { useMemoizedFn, useSafeState, useRequest } from 'ahooks';
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
  const [search] = useSearchParams();
  const params = useParams<UrlParams>();
  const [submitLoading, setSubmitLoading] = useSafeState(false);

  const { data: detail } = useRequest(async () => {
    const result = await queryAgentWorkflowApi({
      flowSnippetUuid: params.uid,
      flowSnippetVersionUuid: params.vid
    });
    return result.flowSnippet;
  });

  const promptUuid = detail?.promptTemplate?.prompt_uuid;

  const onSave = useMemoizedFn(async () => {
    const data = flow.getData()!;

    console.log(data);

    const { 
      flowSnippetVersionUuid,
      ...rest
    } = detail!;

    const type = search.get('type');
    const params: Record<string, any> = {};

    // 如果是新建
    if (type === 'new') {
      params.flowSnippetVersionUuid = flowSnippetVersionUuid;
    }

    await insertUpdateWorkflowApi({
      ...rest,
      ...params,
      promptUuid,
      flowContext: JSON.stringify(data.assembleData),
      flowRelationship: JSON.stringify(data.realDetails)
    });
    message.success('Workflow saved successfully');
    setSubmitLoading(false);
  });

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
      <SpinBox loading={submitLoading}>
        {!!detail && (
          <DetailContent
            flow={flow}
            detail={detail}
          />
        )}
      </SpinBox>
    </PageContainer>
  );
}

export default WorkflowDetail;