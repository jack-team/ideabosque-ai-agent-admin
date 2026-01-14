import type { FC } from 'react';
import { Typography } from 'antd';
import styles from './styles.module.less';

type NodeDescProps = {
  title?: string;
  desc?: string;
}

const NodeDesc: FC<NodeDescProps> = (props) => {
  return (
    <div className={styles.node_desc}>
      <Typography.Paragraph className={styles.title}>
        {props.title}
      </Typography.Paragraph>
      {props.desc && (
        <Typography.Paragraph
          ellipsis={{ rows: 6 }}
          className={styles.description}
        >
          {props.desc}
        </Typography.Paragraph>
      )}
    </div>
  );
}

export default NodeDesc;

