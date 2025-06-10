//@ts-nocheck
import { useConnection } from '@xyflow/react';
 

export default ({ fromX, fromY, toX, toY }: any) => {
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
};