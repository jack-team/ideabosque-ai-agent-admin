import * as uuid from 'uuid';
import type { FC } from "react";
import { useMemoizedFn } from 'ahooks';
import { Handle, Position, useReactFlow } from "@xyflow/react";
import SelectNodeDrawer from "../SelectNodeDrawer";
import type { NodeWrapperProps } from "./types";
import type { SelectResult } from "../SelectNodeDrawer/types";
import { DefaultSourceId, DefaultTargetId } from '../../constants';
import Tools from './tools';
import styles from "./styles.module.less";

const NodeWrapper: FC<NodeWrapperProps> = (props) => {
  const {
    tools,
    nodeProps,
    branch = [],
    enableHandle,
  } = props;

  const nodeId = nodeProps.id;
  const enableSource = enableHandle?.source ?? true;
  const enableTarget = enableHandle?.target ?? true;
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

  const onSelelctNode = useMemoizedFn((r: SelectResult) => {
    const tgId = r.triggerId;
    const newNodeId = uuid.v4();

    // 添加节点
    addNodes({
      id: newNodeId,
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
      target: newNodeId,
      sourceHandle: tgId,
      targetHandle: DefaultTargetId
    });
  });

  const getSourceHandle = (id: string) => {
    return (
      <SelectNodeDrawer
        triggerId={id}
        onChange={onSelelctNode}
      >
        <Handle
          id={id}
          type="source"
          position={Position.Right}
          className={styles.handle_source}
        />
      </SelectNodeDrawer>
    );
  };

  const renderSource = () => {
    if (!branch.length) {
      return getSourceHandle(DefaultSourceId);
    }
    return (
      <div className={styles.branch}>
        {branch.map((item) => (
          <div key={item.id} className={styles.branch_item}>
            <div className={styles.branch_label}>{item.label}</div>
            {getSourceHandle(item.id)}
          </div>
        ))}
      </div>
    );
  };

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
        {enableSource && renderSource()}
      </div>
    </div>
  );
};

export default NodeWrapper;
