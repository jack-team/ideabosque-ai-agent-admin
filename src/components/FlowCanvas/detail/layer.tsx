import type { FC } from 'react';
import { Modal } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ExitIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { useFlowContext, useStepData, useCanvasInctance } from '../hooks';
import { ShopifyButton } from '@/components';
import { getNodeBranchByDetails } from '../helper';
import Canvas from '../canvas';
import styles from './styles.module.less';

const Layer: FC = () => {
  const data = useStepData();
  const [canvas] = useCanvasInctance();
  const { updateNodeData } = useReactFlow();
  const [modal, contextHandler] = Modal.useModal();
  const { closeDetail, detailId } = useFlowContext();

  const details = data?.details;
  const defaultNodes = details?.nodes;
  const defaultEdges = details?.edges;

  const handleSave = useMemoizedFn(() => {
    const details = canvas.getData();
    // 自动生成分支
    const branch = getNodeBranchByDetails(details!);
    const formData = { ...data?.formData, branch };
    updateNodeData(detailId!, { details, formData });
    closeDetail();
  });

  const closeLayer = useMemoizedFn(() => {
    modal.confirm({
      rootClassName: 'shopify',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      okText: 'Yes',
      okButtonProps: {
        className: 'shopify'
      },
      cancelButtonProps: {
        className: 'shopify gray'
      },
      onOk: closeDetail
    });
  });

  return (
    <div className={styles.layer}>
      <div className={styles.layer_header}>
        <IconButton
          children="Back"
          icon={ExitIcon}
          onClick={closeLayer}
          className={styles.close_btn}
        />
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