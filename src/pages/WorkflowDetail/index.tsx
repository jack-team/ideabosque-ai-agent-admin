import { Button, Card } from 'antd';
import { useRef, lazy, Suspense } from 'react';
import { useMemoizedFn } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled } from '@ant-design/icons';
import { Spinner } from '@/components';
import type { AiWorkFlowInstance } from '@/components/AiWorkFlow/types';
import styles from './styles.module.less';
import { nodes, edges } from './mock';
import { processNodeData } from './helper';

const AiWorkFlow = lazy(() => import('@/components/AiWorkFlow'));

function WorkflowDetail() {
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

    console.log(JSON.stringify(datas))

  });

  return (
    <PageContainer
      title="New business buyer onboarding"
      className="shopify full-screen"
      extra={[
        <Button
          className="shopify gray"
          icon={<EditFilled />}
          onClick={getDataHandler}
        >
          Get Data
        </Button>,
        <Button
          className="shopify gray"
          icon={<EditFilled />}
        >
          Edit
        </Button>,
        <Button type="primary" className="shopify">
          Turn on workflow
        </Button>
      ]}
    >
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
              initialNodes={nodes}
              initialEdges={edges}
              ref={flowInstance}
            />
          </Suspense>
        </div>
      </Card>
    </PageContainer>
  );
}

export default WorkflowDetail;