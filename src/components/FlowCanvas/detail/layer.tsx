import type { FC } from 'react';
import { Modal } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { CloseOutlined } from '@ant-design/icons';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { useFlowContext, useStepData, useFlowInstance } from '../hooks';
import { ShopifyButton } from '@/components';
import Canvas from '../canvas';
import styles from './styles.module.less';

const Layer: FC = () => {
  const data = useStepData();
  const [canvas] = useFlowInstance();
  const { updateNodeData } = useReactFlow();
  const [modal, contextHandler] = Modal.useModal();
  const { closeDetail, detailId } = useFlowContext();

  const details = data?.details;
  const defaultNodes = details?.nodes;
  const defaultEdges = details?.edges;

  const handleSave = useMemoizedFn(() => {
    updateNodeData(detailId!, {
      details: canvas.getData()
    });
    setTimeout(closeDetail);
  });

  const closeLayer = useMemoizedFn(() => {
    modal.confirm({
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      okText: 'Yes',
      okButtonProps: {
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify'
      },
      onOk: closeDetail
    });
  });

  return (
    <div className={styles.layer}>
      <div className={styles.layer_header}>
        <div
          onClick={closeLayer}
          className={styles.close_btn}
        >
          <CloseOutlined />
        </div>
        <div className={styles.title}>
          {data?.formData?.name}
        </div>
        <ShopifyButton
          type="primary"
          onClick={handleSave}
        >
          Save
        </ShopifyButton>
      </div>
      <div className={styles.layer_content}>
        <ReactFlowProvider>
          <Canvas
            top={false}
            canvas={canvas}
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}
          />
        </ReactFlowProvider>
      </div>
      {contextHandler}
    </div>
  );
}

export default Layer;