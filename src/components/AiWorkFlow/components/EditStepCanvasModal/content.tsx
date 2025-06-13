import type { FC } from 'react';
import { useRef } from 'react';
import { App, Card } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import AiWorkFlow from '../..';
import { ShopifyButton } from '@/components';
import { useModalClose, useListenModalCancel } from '@/components/TriggerModal';
import type { AiWorkFlowInstance } from '../../types';
import type { EditStepCanvasProps } from './types';
import styles from './styles.module.less';

const EditStepCanvas: FC<EditStepCanvasProps> = (props) => {
  const { message } = App.useApp();
  const [closeModal] = useModalClose();
  const { modal } = App.useApp();
  const flowInstance = useRef<AiWorkFlowInstance>(null);

  const getResult = useMemoizedFn(() => {
    return flowInstance.current!.getData();
  });

  const onSave = useMemoizedFn(() => {
    const result = getResult();
    if (!result.edges.length) {
      message.error('The current flowchart is not completed.');
      return;
    }
    props.onSave?.(result);
    closeModal();
  });

  const onBack = useMemoizedFn(() => {
    modal.confirm({
      rootClassName: 'shopify',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      okButtonProps: { className: 'shopify' },
      cancelButtonProps: { className: 'shopify' },
      okText: 'Yes',
      onOk: () => closeModal()
    })
  });

  useListenModalCancel(async () => {
    return Promise.reject();
  });

  return (
    <PageContainer
      title={props.title}
      onBack={onBack}
      className="shopify full-screen"
      extra={[
        <ShopifyButton
          type="primary"
          onClick={onSave}
        >
          Save
        </ShopifyButton>
      ]}
    >
      <Card className="shopify full-content">
        <div className={styles.flow_work}>
          <AiWorkFlow
            role="child"
            ref={flowInstance}
            initialEdges={props.edges}
            initialNodes={props.nodes}
          />
        </div>
      </Card>
    </PageContainer>
  );
}

export default EditStepCanvas;