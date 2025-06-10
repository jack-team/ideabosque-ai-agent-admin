import type { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SelectNodesDrawer from '../SelectNodesDrawer';
import styles from './styles.module.less';

type AddButtonPros = {
  onAdd?: (type: string, formData: Record<string, any>) => void;
}

const AddButton: FC<AddButtonPros> = (props) => {
  return (
    <SelectNodesDrawer
      onChange={props.onAdd}
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