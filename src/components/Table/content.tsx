import { type FC, type JSX, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { ProCard } from '@ant-design/pro-components';
import { useUpdateEffect } from 'ahooks';
import styles from './styles.module.less';

type TableContentProps = {
  dom: JSX.Element;
  spinning: boolean;
  hasCard: boolean;
  total: number;
}

const TableContent: FC<TableContentProps> = (props) => {
  const { spinning, hasCard, total, dom } = props;
  const isFirst = useRef(true);

  useUpdateEffect(() => {
    isFirst.current = false;
  }, [spinning]);

  const loading = useMemo(() => {
    return isFirst.current || spinning;
  }, [spinning]);

  const rootClassName = classNames(
    styles.table_inner,
    { [styles.spinning_mask_opaque]: !total && loading }
  );

  const domRoot = <div className={rootClassName}>{dom}</div>;

  if (hasCard) {
    return <ProCard>{domRoot}</ProCard>;
  }

  return domRoot;
}

export default TableContent;