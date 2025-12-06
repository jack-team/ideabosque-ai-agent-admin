import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { Collapse, Tag } from 'antd';
import styles from './styles.module.less';

type CustomCollapseProps = {
  tags?: ReactElement[];
  title: string;
}

const CustomCollapse: FC<PropsWithChildren<CustomCollapseProps>> = (props) => {
  const { tags = [], children } = props;

  const label = (
    <div className={styles.label}>
      <div className={styles.title}>{props.title}</div>
      {!!tags.length && <div className={styles.tags}>{tags}</div>}
    </div>
  );

  return (
    <Collapse
      collapsible="icon"
      expandIconPosition="right"
      className={styles.collapse}
      items={[
        {
          key: 'key',
          label: label,
          children: children
        }
      ]}
    />
  );
}

export default CustomCollapse;