import { type ConnectionLineComponent } from '@xyflow/react';
import type { NormalNodeType } from '../../types';

const CustomConnectLine: ConnectionLineComponent<NormalNodeType> = (props) => {
  const { fromX, fromY, toX, toY } = props;

  // 计算转折点 - 这里选择在水平方向中间位置转折
  // 也可以根据需要调整为垂直方向先转折
  const midX = (fromX + toX) / 2;

  // 构建step路径: 水平到中点 -> 垂直到目标点
  const pathData = `M${fromX},${fromY} H${midX} V${toY} H${toX}`;

  return (
    <g>
      <path
        fill="none"
        d={pathData}
        strokeWidth={3}
        stroke="#0143EC"
        className="animated"
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#0143EC"
        strokeWidth={3}
      />
    </g>
  );
}

export default CustomConnectLine;