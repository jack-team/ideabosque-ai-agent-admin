import type { FC, CSSProperties } from 'react';
import { Typography, Tag } from 'antd';
import styles from './styles.module.less';

type LongTextReadonlyProps = {
  value?: string | any[];
  pre?: boolean;
  rows?: number;
}

const LongTextReadonly: FC<LongTextReadonlyProps> = (props) => {
  const { value, pre = false, rows = 1 } = props;

  const renderContent = () => {
    if (Array.isArray(value)) {
      return (
        <div className={styles.tags}>
          {value.map(v => <Tag key={v}>{v}</Tag>)}
        </div>
      );
    } else {
      let val: string = '';

      if (value) {
        if (typeof value === 'object') {
          val = JSON.stringify(value, null, 4);
        } else {
          val = `${value ?? ''}` || '-';
        }
      } else {
        val = '--';
      }
      return pre ? <pre>{val}</pre> : val;
    }
  }

  const WrapperStyle: CSSProperties = {};

  if (rows > 1) {
    WrapperStyle.minHeight = rows * 32;
  }

  return (
    <div className={styles.wrapper} style={WrapperStyle}>
      <Typography.Paragraph>
        {renderContent()}
      </Typography.Paragraph>
    </div>
  );
}

export default LongTextReadonly;