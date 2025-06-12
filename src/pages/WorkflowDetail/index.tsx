import { Button, Card } from 'antd';
import { useRef, lazy, Suspense } from 'react';
import { useMemoizedFn } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled } from '@ant-design/icons';
import { Spinner } from '@/components';
import type { AiWorkFlowInstance } from '@/components/AiWorkFlow/types';
import styles from './styles.module.less';
import { nodes, edges } from './mock';

const AiWorkFlow = lazy(() => import('@/components/AiWorkFlow'));

function WorkflowDetail() {
  const flowInstance = useRef<AiWorkFlowInstance>(null);

  const getDataHandler = useMemoizedFn(() => {
    const result = flowInstance.current?.getData();
    console.log(result);
  });

  return (
    <PageContainer
      title="New business buyer onboarding"
      className="shopify"
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
      <Card className="shopify">
        <div className={styles.container}>
          <Suspense fallback={
            <div className={styles.loading}>
              <Spinner size={32} color="#2AB2D9" />
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