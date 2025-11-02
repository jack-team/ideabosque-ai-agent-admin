import { type FC } from 'react';
import classNames from 'classnames';
import { useSafeState, useUpdateEffect, useMemoizedFn } from 'ahooks';
import Layer from './layer';
import { useFlowContext } from '../hooks';
import styles from './styles.module.less';

const Detail: FC = () => {
  const { detailId } = useFlowContext();
  const [open, setOpen] = useSafeState(!!detailId);

  const openDetail = useMemoizedFn(() => setOpen(true));
  const closeDetail = useMemoizedFn(() => setOpen(false));

  useUpdateEffect(() => {
    let timer: NodeJS.Timeout;
    if (detailId) {
      openDetail();
    } else {
      timer = setTimeout(closeDetail, 400);
    }
    return () => clearTimeout(timer);
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