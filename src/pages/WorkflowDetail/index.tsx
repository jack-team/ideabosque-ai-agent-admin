import { useRef } from 'react';
import { App } from 'antd';
import { useParams } from 'react-router';
import { PageContainer } from '@ant-design/pro-components';
import { useMemoizedFn, useSafeState, useMount } from 'ahooks';
import { queryAgentWorkflowApi } from '@/services/workflow';
import { insertUpdateWorkflowApi } from '@/services/workflow';
import { ShopifyButton } from '@/components';
import type { DetailRefs } from './types';
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
  const params = useParams<UrlParams>();
  const ref = useRef<DetailRefs>(null);
  const [loading, setLoading] = useSafeState(false);
  const [detail, setDetail] = useSafeState<API.Workflow.FlowSnippet>();

  const fetchData = useMemoizedFn(async () => {
    const result = await queryAgentWorkflowApi({
      flowSnippetUuid: params.uid,
      flowSnippetVersionUuid: params.vid
    });
    setDetail(result.flowSnippet);
  });

  const onSave = useMemoizedFn(async () => {
    const data = ref.current?.getData()!;
    setLoading(true);
    await insertUpdateWorkflowApi({
      ...detail!,
      flowContext: JSON.stringify(data.flowContext),
      flowRelationship: JSON.stringify(data.flowRelationship)
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
        {detail ? <DetailContent ref={ref} detail={detail}/> : null}
      </SpinBox>
    </PageContainer>
  )
}

export default WorkflowDetail;