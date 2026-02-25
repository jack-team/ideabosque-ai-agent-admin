import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import IconButton from '@/components/IconButton';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { useLang } from '@/hooks/useLang';
import { useFlowContext, useStepData, useCanvasInctance } from '../hooks';
import ShopifyButton from '@/components/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { getNodeBranchByDetails } from '../helper';
import Canvas from '../canvas';
import styles from './styles.module.less';

const Layer: FC = () => {
  const data = useStepData();
  const { t } = useLang();
  const [confirm] = useConfirm();
  const [canvas] = useCanvasInctance();
  const { updateNodeData } = useReactFlow();
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
    confirm({
      title: t('common.Are you sure you want to leave'),
      content: t('common.The data on this page will be lost after leaving'),
      okText: t('common.yes'),
      onConfirm: closeDetail
    });
  });

  return (
    <div className={styles.layer}>
      <div className={styles.layer_header}>
        <IconButton
          children={t('common.back')}
          icon={ArrowLeftIcon}
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
          {t('common.save')}
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
    </div>
  );
}

export default Layer;