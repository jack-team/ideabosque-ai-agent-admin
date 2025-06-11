import * as uuid from 'uuid';
import type { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import SelectNodesDrawer from '../SelectNodesDrawer';
import type { ResultType } from '../SelectNodesDrawer/types';
import { useAiWorkFlowContext } from '../../hooks';
import styles from './styles.module.less';

const AddButton: FC = () => {
  const { insertNodes } = useAiWorkFlowContext();

  const handleChange = useMemoizedFn((result: ResultType) => {
    const { nodeType } = result;
    const id = `${nodeType}_${uuid.v4()}`;

    insertNodes([
      {
        id,
        type: nodeType,
        data: { values: result },
        position: { x: 0, y: 0 }
      }
    ]);
  });

  return (
    <SelectNodesDrawer
      title="What triggers this workflow?"
      onChange={handleChange}
      trigger={
        <div className={styles.add_btn}>
          <PlusOutlined />
        </div>
      }
    />
  );
}

export default AddButton;