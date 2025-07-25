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
    Form,
    nodeId,
    branch = [],
    enableHandle,
    editFormData,
    editFormTitle,
    showTool = true,
  } = props;

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

  const onSelelctNode = useMemoizedFn((result: SelectResult) => {
    const newNodeId = uuid.v4();
    const sourceHandle = result.triggerId;

    // 添加节点
    addNodes({
      id: newNodeId,
      data: result,
      type: result.nodeType,
      position: getNextPos()
    });

    // 自动连线
    addEdges({
      id: uuid.v4(),
      // 连接的起点 id
      source: nodeId,
      // 连接的终点 id
      target: newNodeId,
      sourceHandle,
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
        {showTool && (
          <Tools
            Form={Form}
            nodeId={nodeId}
            editFormData={editFormData}
            editFormTitle={editFormTitle}
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
