import type { MouseEvent } from 'react';
import type { ButtonProps } from 'antd';

export type ShopifyButtonProps = {
  async?: boolean;
  enableClickLoading?: boolean;
  onClick?: (e: MouseEvent) => Promise<void> | void;
} & Omit<ButtonProps, 'onClick'>;