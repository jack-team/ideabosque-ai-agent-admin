import { useMemo } from 'react';
import type { RenderHandle, NodeProps } from './types';
import CustomNodeToolbar from '../../components/CustomNodeToolbar';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import { useAiWorkFlowContext } from '../../hooks';
import Handler from './handler';
import styles from './styles.module.less';

type NodeLayoutProps<D = any> = NodeProps & {
  children?: RenderHandle<D>;
  handler?: boolean | RenderHandle<D>;
}

function NodeLayout<D extends {} = {}>(props: NodeLayoutProps<D>) {
  const {
    data,
    children,
    handler = true
  } = props;

  const values = data.values;
  const nodeType = values.nodeType;
  const { schemas = [] } = useAiWorkFlowContext();

  const formData = useMemo(() => {
    return transformInputFormData(values.formData) as D;
  }, [values.formData]);

  const nodeDetail = useMemo(() => {
    return schemas.find(node => {
      return node.type === nodeType;
    });
  }, [schemas]);

  const renderHandler = () => {
    const defaultHandle = (
      <Handler {...props} />
    );
    if (handler === true) {
      return defaultHandle;
    }
    if (typeof handler === 'function') {
      return handler?.(formData) ?? defaultHandle;
    }
  }

  return (
    <div className={styles.node_layout_wrapper}>
      <div className={styles.tool_bar}>
        <CustomNodeToolbar
          id={props.id}
          data={data}
          formData={formData}
          schemas={nodeDetail?.formSchema}
          editModalWidth={nodeDetail?.modalWidth}
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