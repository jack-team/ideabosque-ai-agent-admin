import type { FC, PropsWithChildren, CSSProperties } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.module.less';

type SpinBoxProps = {
  loading?: boolean;
  alpha?: number;
  className?: string;
}

const SpinBox: FC<PropsWithChildren<SpinBoxProps>> = (props) => {
  const { loading = false, alpha = .8 } = props;
  const cssStyle = { '--alpha': alpha } as CSSProperties;
  return (
    <div
      style={cssStyle}
      className={classNames(
        styles.spin_box,
        props.className
      )}
    >
      <div className={styles.spin_box_content}>
        {props.children}
      </div>
      {loading && (
        <div className={styles.spin_mask}>
          <Spinner type="infinity-spin" />
        </div>
      )}
    </div>
  );
}

export default SpinBox;