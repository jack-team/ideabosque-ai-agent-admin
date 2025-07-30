import type { FC } from 'react';
import classNames from 'classnames';
import Layer from './layer';
import { useFlowContext } from '../hooks';
import styles from './styles.module.less';

const Detail: FC = () => {
  const {
    detailId
  } = useFlowContext();

  const cls = classNames(
    styles.detail,
    !!detailId && styles.show
  );

  return (
    <div className={cls}>
      {!!detailId && <Layer />}
    </div>
  );
}

export default Detail;