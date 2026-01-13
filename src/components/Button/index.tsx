import { type FC, memo } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import Spinner from '../Spinner';
import styles from './styles.module.less';

type ButtonProps = Omit<AntButtonProps, 'loading'> & {
  loading?: boolean;
  gray?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    gray,
    onClick,
    children,
    className,
    loading = false,
    ...reset
  } = props;

  const handleClick = useMemoizedFn((e) => {
    if (!loading) onClick?.(e);;
  });

  return (
    <AntButton
      {...reset}
      onClick={handleClick}
      className={classNames(
        styles.bth,
        gray && 'gray-mode',
        loading && styles.loading,
        className
      )}
    >
      {loading && <Spinner className={styles.spinner} />}
      <div className={styles.btn_content}>{children}</div>
    </AntButton>
  )
}

export default memo(Button);