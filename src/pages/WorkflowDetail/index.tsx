import { Button, Card } from 'antd';
import cloneDeep from 'clone-deep';
import { useRef, lazy, Suspense } from 'react';
import { useMemoizedFn } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled } from '@ant-design/icons';
import { Spinner } from '@/components';
import type { Edge } from '@xyflow/react';
import type { AiWorkFlowInstance } from '@/components/AiWorkFlow/types';
import type { NodeType } from '@/components/AiWorkFlow/types';
import styles from './styles.module.less';
import { nodes, edges } from './mock';
import { transformInputFormData } from '@/components/AiWorkFlow/components/DynamicForm/helper';

const AiWorkFlow = lazy(() => import('@/components/AiWorkFlow'));

function WorkflowDetail() {
  const flowInstance = useRef<AiWorkFlowInstance>(null);

  const getDataHandler = useMemoizedFn(() => {
    const result = flowInstance.current?.getData()!;
    const { nodes: stepNodes = [], edges: stepEdges = [] } = result;

    const deepData = (node: NodeType, edges: Edge[]) => {
      const nodeId = node.id;
      const values = node.data.values;
      const formData = values.formData;

      const edge = edges.find(edge => {
        return edge.source === nodeId;
      });

      return {
        ...values,
        uid: nodeId,
        nextId: edge?.target,
        formData: transformInputFormData(formData)
      }
    };

    const stpes = stepNodes.map(node=> {
      return deepData(node, stepEdges); 
    });


    const data = stpes.map(step => {
      const stepData = step.stepRealData;
      const childNodes = stepData?.nodes || [];
      const childEdges = stepData?.edges || [];

    });

    // console.log('Workflow Data:', data);

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