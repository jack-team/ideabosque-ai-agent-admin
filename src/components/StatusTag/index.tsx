import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Tag } from 'antd';
import { StatusEnum } from '@/constants/enum'
import styles from './styles.module.less';

type StatusTagProps = {
  suatus: `${StatusEnum}`
}

const StatusTag: FC<PropsWithChildren<StatusTagProps>> = (props) => {
  return (
    <Tag className={classNames(
      styles.status_tag,
      styles[props.suatus]
    )}>
      {props.children}
    </Tag>
  );
}

export default StatusTag;