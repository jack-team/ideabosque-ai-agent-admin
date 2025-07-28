import type { FC } from 'react';

type MarkerProps = {
  id: string;
  stroke: string;
}

const Marker: FC<MarkerProps> = (props) => {
  const { stroke } = props;
  return (
    <defs>
      <marker
        id={props.id}
        refX="0"
        refY="0"
        markerWidth="12.5"
        markerHeight="12.5"
        viewBox="-10 -10 20 20"
        markerUnits="strokeWidth"
        orient="auto-start-reverse"
        style={{
          stroke,
          fill: stroke,
          strokeWidth: 1
        }}
      >
        <polyline
          strokeLinecap="round"
          strokeLinejoin="round"
          points="-5,-4 0,0 -5,4 -5,-4"
        />
      </marker>
    </defs>
  );
}

export default Marker;