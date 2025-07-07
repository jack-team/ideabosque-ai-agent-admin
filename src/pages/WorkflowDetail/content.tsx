import type { FC } from 'react';
import { Card } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useRef, lazy, Suspense } from 'react';
import type { AiWorkFlowInstance } from '@/components/AiWorkFlow/types';
import { Spinner } from '@/components';
import { nodes, edges } from './mock';
import { processNodeData } from './helper';
import styles from './styles.module.less';

const AiWorkFlow = lazy(() => import('@/components/AiWorkFlow'));

const DetailContent: FC = () => {
  const flowInstance = useRef<AiWorkFlowInstance>(null);

   const getDataHandler = useMemoizedFn(() => {
    const result = flowInstance.current?.getData()!;
    const { nodes: stepNodes = [], edges: stepEdges = [] } = result;
    const stpes = stepNodes.map(node => processNodeData(node, stepEdges));

    const datas = stpes.map(step => {
      const { detail, ...rest } = step;
      const nodes = detail?.nodes || [];
      const edges = detail?.edges || [];
      const details = nodes.map(node => processNodeData(node, edges, step));
      return { ...rest, details };
    });

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
            initialNodes={nodes}
            initialEdges={edges}
          />
        </Suspense>
      </div>
    </Card>
  );
}

export default DetailContent;