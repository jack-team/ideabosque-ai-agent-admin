import type { FC, SVGProps } from 'react';
import { Button, type ButtonProps } from 'antd';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import styles from './styles.module.less';

type IconButtonProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
} & Omit<ButtonProps, 'icon'>;

export const withIcon = (icon: FC<SVGProps<SVGSVGElement>>) => {
  return (props: Record<string, any>) => <Icon component={icon} {...props} />
}

const IconButton: FC<IconButtonProps> = (props) => {
  const {
    icon,
    className,
    type = 'text',
    size = 'small',
    ...rest
  } = props;

  const Icon = withIcon(icon);

  return (
    <Button
      {...rest}
      type={type}
      icon={<Icon />}
      className={classNames(styles.icon_btn, className)}
    />
  );
}

export default IconButton;