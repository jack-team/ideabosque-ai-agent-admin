import classNames from 'classnames';
import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import styles from './styles.module.less';

type CustomCollapseProps = {
  tags?: ReactElement[];
  title: string;
  desc?: string;
}

const CustomCollapse: FC<PropsWithChildren<CustomCollapseProps>> = (props) => {
  const { tags = [], desc, children } = props;
  const [collapsible, setCollapsible] = useSafeState(false);
  const [created, setCreated] = useSafeState(collapsible);

  useUpdateEffect(() => {
    if (collapsible) setCreated(collapsible);
  }, [collapsible]);

  const toggleCollapsible = useMemoizedFn(() => {
    setCollapsible(!collapsible);
  });

  const className = classNames(
    styles.body,
    collapsible && styles.collapsible
  );

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleCollapsible}>
        <div className={styles.left}>
          <div className={styles.title}>{props.title}</div>
          {!!desc && <div className={styles.desc}>{desc}</div>}
        </div>
        <CaretRightOutlined rotate={collapsible ? 90 : 0} />
      </div>
      {tags.length > 0 && <div className={styles.tags}>{tags}</div>}
      {created && <div className={className}>{children}</div>}
    </div>
  );
}

export default CustomCollapse;