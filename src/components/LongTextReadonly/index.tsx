import type { FC } from 'react';
import { Typography, Tag } from 'antd';
import styles from './styles.module.less';

type LongTextReadonlyProps = {
  value?: string | any[];
  pre?: boolean;
}

const LongTextReadonly: FC<LongTextReadonlyProps> = (props) => {
  const { value, pre = false } = props;

  const renderContent = () => {
    if (Array.isArray(value)) {
      return (
        <div className={styles.tags}>
          {value.map(v => <Tag key={v}>{v}</Tag>)}
        </div>
      );
    } else {
      const val = `${props.value ?? ''}` || '-';
      return pre ? <pre>{val}</pre> : val;
    }
  }

  return (
    <div className={styles.wrapper}>
      <Typography.Paragraph>
        {renderContent()}
      </Typography.Paragraph>
    </div>
  );
}

export default LongTextReadonly;