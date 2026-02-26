import type { FC, ReactElement } from 'react';
import { Typography } from 'antd';
import cls from 'classnames';
import styles from './styles.module.less';

type NodeDescProps = {
  title?: string;
  desc?: string;
  titleIcon?: ReactElement;
}

const NodeDesc: FC<NodeDescProps> = (props) => {
  const { titleIcon } = props;
  return (
    <div className={styles.node_desc}>
      <Typography.Paragraph className={cls(styles.title, !!titleIcon && styles.has_icon)}>
        {props.title}
        {!!titleIcon && (
          <div className={styles.title_icon}>
            {titleIcon}
          </div>
        )}
      </Typography.Paragraph>
      {props.desc && (
        <Typography.Paragraph
          ellipsis={{ rows: 2 }}
          className={styles.description}
        >
          {props.desc}
        </Typography.Paragraph>
      )}
    </div>
  );
}

export default NodeDesc;

