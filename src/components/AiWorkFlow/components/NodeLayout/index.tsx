import { Fragment, useMemo } from 'react';
import type { DataType } from './types';
import type { NodeComponent } from '../../types';
import CustomNodeToolbar from '../../components/CustomNodeToolbar';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import Handler from './handler';
import styles from './styles.module.less';

type NodeLayoutProps = Parameters<NodeComponent<DataType>>[0] & {
  children?: any;
  showHandler?: boolean;
}

const NodeLayout = (props: NodeLayoutProps) => {
  const {
    data,
    children,
    showHandler = true
  } = props;
  
  const values = data.values;

  const formData = useMemo(() => {
    return transformInputFormData(values.formData);
  }, [values.formData]);

  return (
    <Fragment>
      <CustomNodeToolbar
        id={props.id}
        data={data}
        formData={formData}
        schemas={values.schemas}
      />
      {showHandler && <Handler {...data} />}
      <div className={styles.node_layout}>{children}</div>
    </Fragment>
  );
}

export default NodeLayout;