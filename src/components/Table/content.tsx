import { type FC, type JSX } from 'react';
import classNames from 'classnames';
import { ProCard } from '@ant-design/pro-components';
import styles from './styles.module.less';

type TableContentProps = {
  dom: JSX.Element;
  spinning: boolean;
  hasCard: boolean;
  total: number;
}

const TableContent: FC<TableContentProps> = (props) => {
  const { spinning, hasCard, total, dom } = props;

  const rootClassName = classNames(
    styles.table_inner,
    { [styles.spinning_mask_opaque]: !total && spinning }
  );

  const domRoot = <div className={rootClassName}>{dom}</div>;

  if (hasCard) {
    return <ProCard>{domRoot}</ProCard>;
  }

  return domRoot;
}

export default TableContent;