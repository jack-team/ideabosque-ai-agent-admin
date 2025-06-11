import { Fragment } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { NodeToolbar } from '@xyflow/react';
import type { NodeComponent } from '../../types';
import type { DataType } from './types';
import Handler from './handler';
import styles from './styles.module.less';

const UiNode: NodeComponent<DataType> = (props) => {
  const { data } = props;
  return (
    <Fragment>
      <NodeToolbar>
        <Button className="shopify">
          <EditFilled />
        </Button>
      </NodeToolbar>
      <div className={styles.ui_node}>
        <Handler {...data} />
        <div className={styles.ui_node_header}>
           {data.values.name.label}
        </div>
        <div className={styles.ui_node_body}>
          <div className={styles.node_text}>
            {data.values.text}
          </div>
          <div className={styles.wait_for}>
            Wait For: {data.values.waitFor}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UiNode;