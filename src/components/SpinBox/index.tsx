import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner';
import StyledVariables from '../StyledVariables';
import styles from './styles.module.less';

type SpinBoxProps = {
  loading?: boolean;
  alpha?: number;
  className?: string;
}

const SpinBox: FC<PropsWithChildren<SpinBoxProps>> = (props) => {
  const { loading = false, alpha = .3 } = props;

  return (
    <div className={classNames(styles.spin_box, props.className)}>
      <StyledVariables
        variables={{ alpha }}
        namespace={styles.spin_box}
      />
      <div className={styles.spin_box_content}>
        {props.children}
      </div>
      {loading && (
        <div className={styles.spin_mask}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default SpinBox;