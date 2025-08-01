import type { FC } from "react";
import { Handle, Position, useNodeId } from "@xyflow/react";
import Tools from './tools';
import Branch from './branch';
import { useAddNode } from '../../hooks';
import { DefaultTargetId } from '../../constants';
import type { NodeWrapperProps } from "./types";
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

  const nodeId = useNodeId();
  const [addNode] = useAddNode();

  return (
    <div className={styles.wrapper}>
      <div className={styles.tools}>
        {!!tools&& nodeId && (
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
            onChange={addNode}
          />
        )}
      </div>
    </div>
  );
};

export default NodeWrapper;
