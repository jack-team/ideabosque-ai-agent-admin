import type { FC } from 'react';
import classNames from 'classnames';
import Icon from '@ant-design/icons';
import type { SpinnerProps } from './types';
import SpinnerSvg from './spinner.svg?react';
import styles from './styles.module.less';

const Spinner: FC<SpinnerProps> = (props) => {
  const { className } = props;
  return (
    <div className={classNames(styles.spinner, className)}>
      <Icon component={SpinnerSvg} />
    </div>
  );
}

export default Spinner;