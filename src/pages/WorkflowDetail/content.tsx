import { Card } from 'antd';
import cloneDeep from 'clone-deep';
import { useMemoizedFn } from 'ahooks';
import { useRef, lazy, Suspense, forwardRef, useImperativeHandle, useMemo } from 'react';
import type { AiWorkFlowInstance, FlowSaveResult } from '@/components/AiWorkFlow/types';
import { Spinner } from '@/components';
import { processNodeData } from './helper';
import type { DetailRefs } from './types';
import styles from './styles.module.less';

const AiWorkFlow = lazy(() => import('@/components/AiWorkFlow'));

type DetailContentProps = {
  detail: API.Workflow.FlowSnippet;
}

const DetailContent = forwardRef<DetailRefs, DetailContentProps>((props, ref) => {
  const { detail } = props;
  const flowInstance = useRef<AiWorkFlowInstance>(null);

  // Parse the flow relationship from the detail
  const relationship = useMemo<FlowSaveResult>(() => {
    return JSON.parse(detail.flowRelationship ?? '{}');
  }, [detail.flowRelationship]);

  const getDataHandler = useMemoizedFn(() => {
    const result = flowInstance.current?.getData()!;
    const {
      nodes: stepNodes = [],
      edges: stepEdges = []
    } = cloneDeep(result);

    const stpes = stepNodes.map(node => {
      return processNodeData(node, stepEdges);
    });

    const datas = stpes.map(step => {
      const { detail, ...rest } = step;
      const nodes = detail?.nodes || [];
      const edges = detail?.edges || [];

      const details = nodes.map(node => {
        return processNodeData(node, edges, step);
      });
      return { ...rest, details };
    });

    return {
      flowContext: datas,
      flowRelationship: result
    }
  });


  useImperativeHandle(ref, () => {
    return { getData: getDataHandler };
  });

  return (
    <Card className="shopify full-content">
      <div className={styles.container}>
        <Suspense
          fallback={
            <div className="lazy-loading">
              <Spinner size={48} />
            </div>
          }
        >
          <AiWorkFlow
            ref={flowInstance}
            initialNodes={relationship.nodes}
            initialEdges={relationship.edges}
          />
        </Suspense>
      </div>
    </Card>
  );
})

export default DetailContent;