import type { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SelectNodesDrawer from '../SelectNodesDrawer';
import styles from './styles.module.less';

const AddButton: FC = () => {
  return (
    <SelectNodesDrawer
      title="What triggers this workflow?"
      trigger={
        <div className={styles.add_btn}>
          <PlusOutlined />
        </div>
      }
    />
  );
}

export default AddButton;