import { useMemo } from 'react';
import type { RenderHandle, NodeProps } from './types';
import CustomNodeToolbar from '../../components/CustomNodeToolbar';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import Handler from './handler';
import styles from './styles.module.less';

type NodeLayoutProps = NodeProps & {
  children?: RenderHandle;
  handler?: boolean | RenderHandle;
}

const NodeLayout = (props: NodeLayoutProps) => {
  const {
    data,
    children,
    handler = true
  } = props;

  const values = data.values;

  const formData = useMemo(() => {
    return transformInputFormData(values.formData);
  }, [values.formData]);

  const renderHandler = () => {
    if (handler === true) {
      return <Handler {...props} />;
    }
    if (typeof handler === 'function') {
      return handler?.(formData);
    }
  }

  return (
    <div className={styles.node_layout_wrapper}>
      <div className={styles.tool_bar}>
        <CustomNodeToolbar
          id={props.id}
          data={data}
          formData={formData}
          schemas={values.schemas}
        />
      </div>
      <div className={styles.node_layout}>
        <div className={styles.node_layout_body}>
          {children?.(formData)}
        </div>
        {renderHandler()}
      </div>
    </div>
  );
}

export default NodeLayout;