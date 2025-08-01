import type { FC } from 'react';
import { PlusOutlined} from '@ant-design/icons';
import SelectNodeDrawer from '../SelectNodeDrawer';
import { useAddNode } from '../../hooks';
import styles from './styles.module.less';

type AddNodeButtonProps = {

}

const AddNodeButton: FC<AddNodeButtonProps> = () => {
  const [addNode] = useAddNode();
  return (
    <SelectNodeDrawer onChange={addNode}>
      <div className={styles.add_button}>
        <PlusOutlined />
      </div>
    </SelectNodeDrawer>
  );
}

export default AddNodeButton;