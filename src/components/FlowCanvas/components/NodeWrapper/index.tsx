import * as uuid from 'uuid';
import type { FC } from "react";
import { useMemoizedFn } from 'ahooks';
import { Handle, Position, useReactFlow, useNodeId } from "@xyflow/react";
import Tools from './tools';
import Branch from './branch';
import { useCanvasDetail } from '../../hooks';
import { DefaultTargetId } from '../../constants';
import type { NodeWrapperProps } from "./types";
import type { SelectResult } from "../SelectNodeDrawer/types";
import styles from "./styles.module.less";

const NodeWrapper: FC<NodeWrapperProps> = (props) => {
  const {
    tools,
    branch = [],
    enableHandle,
  } = props;

  const {
    source: enableSource = true,
    target: enableTarget = true
  } = enableHandle || {};

  const nodeId = useNodeId()!;
  const { openDetail } = useCanvasDetail();
  const { addEdges, addNodes, getNodes } = useReactFlow();

  // 获取下一个坐标
  const getNextPos = useMemoizedFn(() => {
    const nodes = getNodes();
    const node = nodes.find(e => e.id === nodeId);

    let x = node?.position.x || 0;
    const y = node?.position.y || 0;
    x = x + (node?.measured?.width || 0) + 80;

    return { x, y }
  });

  const onAddNode = useMemoizedFn((r: SelectResult) => {
    const tgId = r.triggerId;
    const newId = uuid.v4();

    // 添加节点
    addNodes({
      id: newId,
      data: r,
      type: r.nodeType,
      position: getNextPos()
    });

    // 自动连线
    addEdges({
      id: uuid.v4(),
      // 连接的起点 id
      source: nodeId,
      // 连接的终点 id
      target: newId,
      sourceHandle: tgId,
      targetHandle: DefaultTargetId
    });

    if (r.nodeType === 'step-node') {
      openDetail(newId);
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.tools}>
        {!!tools && (
          <Tools
            nodeId={nodeId}
            tools={tools}
          />
        )}
      </div>
      <div className={styles.inner}>
        {enableTarget && (
          <Handle
            type="target"
            id={DefaultTargetId}
            position={Position.Left}
            className={styles.handle}
            isConnectableStart={false}
          />
        )}
        <div className={styles.content}>
          {props.children}
        </div>
        {enableSource && (
          <Branch
            branch={branch}
            onChange={onAddNode}
          />
        )}
      </div>
    </div>
  );
};

export default NodeWrapper;
