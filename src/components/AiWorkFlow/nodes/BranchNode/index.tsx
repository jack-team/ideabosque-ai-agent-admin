import { Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { Fragment, useMemo } from 'react';
import { EditFilled } from '@ant-design/icons';
import { NodeToolbar } from '@xyflow/react';
import { TriggerModal } from '@/components'
import type { DataType } from './types';
import type { NodeComponent } from '../../types';
import { useAiWorkFlowContext } from '../../hooks';
import DynamicForm from '../../components/DynamicForm';
import type { DynamicFormResult } from '../../components/DynamicForm/types';
import { transformInputFormData } from '../../components/DynamicForm/helper';
import Handler from './handler';

import styles from './styles.module.less';

const BranchNode: NodeComponent<DataType> = (props) => {
  const { data } = props;
  const values = data.values;

  const formData = useMemo(() => {
    return transformInputFormData(values.formData);
  },[values.formData]);

  const { updateNodeData } = useAiWorkFlowContext();

  const handleUpdate = useMemoizedFn(async (result: DynamicFormResult) => {
    data.values = Object.assign(data.values, result);
    updateNodeData(props.id, data);
  });

  return (
    <Fragment>
      <NodeToolbar>
        <TriggerModal
          title="Edit"
          okText="Save"
          trigger={
            <Button className="shopify">
              <EditFilled />
            </Button>
          }
        >
          <DynamicForm
            formData={formData}
            schemas={values.schemas}
            onSubmit={handleUpdate}
          />
        </TriggerModal>
      </NodeToolbar>
      <div className={styles.branch_node}>
        <div className={styles.branch_node_header}>
          {formData.branchName}
        </div>
        <div className={styles.branch_node_body}>
          <div className={styles.branch_node_text}>
            {formData.text}
          </div>
        </div>
        <Handler {...data} conditions={formData.conditions} />
      </div>
    </Fragment>
  );
}

export default BranchNode;