import {
  BaseEdge,
  useReactFlow,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps
} from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { useMemo, Fragment, type FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Marker from './marker';
import styles from './styles.module.less';

const CustomStepEdge: FC<EdgeProps> = (props) => {
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

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 20
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
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={`url(#${id})`}
        style={{ stroke, strokeWidth: 4 }}
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
