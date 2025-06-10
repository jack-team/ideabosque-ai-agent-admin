import { PlusOutlined } from '@ant-design/icons';
import type { NodeComponent } from '../../types';
import styles from './styles.module.less';

type DataType = {
  onClick?: () => void;
}

const FirstAdd: NodeComponent<DataType> = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      <div
        onClick={data.onClick}
        className={styles.add_btn}
      >
        <PlusOutlined />
      </div>
      <div className={styles.label}>
        Add first step
      </div>
    </div>
  );
}

export default FirstAdd;