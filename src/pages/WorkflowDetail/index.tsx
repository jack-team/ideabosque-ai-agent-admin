import { Button, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled } from '@ant-design/icons';

import AiWorkFlow from '@/components/AiWorkFlow';

import styles from './styles.module.less';


function WorkflowDetail() {
  return (
    <PageContainer
      title="New business buyer onboarding"
      className="shopify"
      extra={[
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
          <AiWorkFlow /> 
        </div>
      </Card>
    </PageContainer>
  );
}

export default WorkflowDetail;