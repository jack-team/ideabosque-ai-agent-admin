import { Space } from 'antd';
import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import IconButton, { withIcon } from '@/components/IconButton';
import { useReactFlow } from '@xyflow/react';
import { useNodeWrapperCtx } from '../../hooks';
import type { ToolsProps } from './types';
import styles from './styles.module.less';

const WDeleteIcon = withIcon(DeleteIcon);
const WEditIcon = withIcon(EditIcon);


const Tools: FC<ToolsProps> = (props) => {
  const { nodeId } = props;
  const { setNodes, setEdges } = useReactFlow();
  const { renderEditForm } = useNodeWrapperCtx();

  const handleDeleteNode = useMemoizedFn(() => {
    //删除节点，同时删除对应的边
    setNodes(ns => ns.filter(n => n.id !== nodeId));
    setEdges(edges => edges.filter(e => e.source !== nodeId && e.target !== nodeId));
  });

  return (
    <Space size={8}>
      {renderEditForm?.(
        <div className={styles.tool_btn}>
          <WEditIcon />
        </div>
      )}
      <div
        className={styles.tool_btn}
        onClick={handleDeleteNode}
      >
        <WDeleteIcon />
      </div>
    </Space>
  );
};

export default Tools;
