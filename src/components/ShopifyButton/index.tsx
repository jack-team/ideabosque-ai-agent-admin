import type { FC, MouseEvent } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { Button } from 'antd';
import classNames from 'classnames';
import { Spinner } from '@/components';
import type { ShopifyButtonProps } from './types';

const ShopifyButton: FC<ShopifyButtonProps> = (props) => {
  const {
    icon,
    loading,
    className,
    children,
    onClick,
    ...rest
  } = props;

  const [
    asyncLoading,
    setAsyncLoading
  ] = useSafeState(false);

  const btnLoading = loading || asyncLoading;

  const handleClick = useMemoizedFn(async (e: MouseEvent) => {
    if (loading) {
      return;
    }
    setAsyncLoading(true);
    try {
      await onClick?.(e);
    } catch (err) {
      console.error(err);
    } finally {
      setAsyncLoading(false);
    }
  });

  return (
    <Button
      {...rest}
      onClick={handleClick}
      icon={!btnLoading ? icon :
        <Spinner
          size={20}
          color="#aaa"
        />
      }
      className={classNames(
        'shopify',
        className,
        btnLoading && 'ant-btn-loading'
      )}
    >
      <span className="ant-btn-children">
        {children}
      </span>
    </Button>
  );
}

export default ShopifyButton;