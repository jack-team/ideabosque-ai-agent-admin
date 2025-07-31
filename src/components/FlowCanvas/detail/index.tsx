import { type FC } from 'react';
import classNames from 'classnames';
import { useSafeState, useUpdateEffect, useMemoizedFn } from 'ahooks';
import { useFlowContext } from '../hooks';
import Layer from './layer';
import styles from './styles.module.less';

const Detail: FC = () => {
  const {
    detailId
  } = useFlowContext();

  const [
    open,
    setOpen
  ] = useSafeState(false);

  const openDetail = useMemoizedFn(
    () => setOpen(true)
  );

  const closeDetail = useMemoizedFn(
    () => setOpen(false)
  );

  useUpdateEffect(() => {
    if (detailId) {
      openDetail();
    } else {
      setTimeout(closeDetail, 400);
    }
  }, [detailId]);

  const cls = classNames(
    styles.detail,
    !!detailId && styles.show
  );

  return (
    <div className={cls}>
      {open && <Layer />}
    </div>
  );
}

export default Detail;