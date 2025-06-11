import { useConnection } from '@xyflow/react';
import type { ConnectionLineComponent, Node } from '@xyflow/react';
import type { DataType } from '../NodeLayout/types';

const ConnLine: ConnectionLineComponent<Node<DataType>> = (props) => {
  const { fromX, fromY, toX, toY } = props;
  const { fromHandle } = useConnection();
  return (
    <g>
      <path
        fill="none"
        stroke="#0143EC"
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#0143EC"
        strokeWidth={2}
      />
    </g>
  );
}

export default ConnLine;