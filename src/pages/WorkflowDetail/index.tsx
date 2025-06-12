import { Button, Card } from 'antd';
import { useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled } from '@ant-design/icons';
import AiWorkFlow from '@/components/AiWorkFlow';
import type { AiWorkFlowInstance } from '@/components/AiWorkFlow/types';
import styles from './styles.module.less';
import { nodes, edges } from './mock';

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
          <AiWorkFlow
            initialNodes={nodes}
            initialEdges={edges}
            ref={flowInstance}
          />
        </div>
      </Card>
    </PageContainer>
  );
}

export default WorkflowDetail;