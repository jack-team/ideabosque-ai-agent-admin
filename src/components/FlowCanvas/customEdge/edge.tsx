import {
  StepEdge,
  useReactFlow,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps
} from '@xyflow/react';
import { useMemo, Fragment } from 'react';
import { useMemoizedFn } from 'ahooks';
import { CloseOutlined } from '@ant-design/icons';
import Marker from './marker';
import styles from './styles.module.less';

const CustomStepEdge = (props: EdgeProps) => {
  const {
    id,
    selected,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  } = props;

  const { setEdges } = useReactFlow();

  const [_, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  const transform = useMemo(() => {
    return `translate(-50%, -50%) 
      translate(${labelX}px,${labelY}px)`;
  }, [labelX, labelY]);

  const stroke = selected ? '#f40' : '#0143EC';

  const deleteLine = useMemoizedFn(() => {
    setEdges((es) => es.filter((e) => e.id !== id));
  });

  return (
    <Fragment>
      <Marker stroke={stroke} id={id} />
      <StepEdge
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        markerEnd={`url(#${id})`}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        style={{ stroke, strokeWidth: 2 }}
      />
      <EdgeLabelRenderer>
        {selected ? (
          <div
            style={{ transform }}
            onClick={deleteLine}
            className={styles.del_btn}
          >
            <CloseOutlined />
          </div>
        ) : null}
      </EdgeLabelRenderer>
    </Fragment>
  );
}

export default CustomStepEdge;
