import { useMemoizedFn } from 'ahooks';
import { EnterIcon } from '@shopify/polaris-icons';
import { type FC, type ReactElement, type PropsWithChildren } from 'react';
import { Handle, Position, useNodeId, useReactFlow } from "@xyflow/react";
import { withIcon } from '@/components/IconButton';
import Tools from './tools';
import Branch from './branch';
import ModalForm from '../ModalForm';
import type { NodeWrapperProps } from './types';
import { DefaultTargetId } from '../../constants';
import { NodeWrapperContext } from './context';
import { useAddNode, useNodeFormData, useCanvasContext, useFlowContext } from '../../hooks';
import styles from './styles.module.less';

const WEnterIcon = withIcon(EnterIcon);

const NodeWrapper: FC<PropsWithChildren<NodeWrapperProps>> = (props) => {
  const { tools, branch = [], enableHandle } = props;

  const editForm = tools?.editForm;
  const enableSource = enableHandle?.source ?? true;
  const enableTarget = enableHandle?.target ?? true;

  const nodeId = useNodeId();
  const [addNode] = useAddNode();
  const formData = useNodeFormData();
  const { top } = useCanvasContext();
  const { openDetail } = useFlowContext();
  const { updateNodeData } = useReactFlow();

  const onSaveNodeData = useMemoizedFn(
    async (formData: Record<string, any>) => {
      updateNodeData(nodeId!, { formData })
    }
  );

  const openCanvasDetail = useMemoizedFn(() => {
    openDetail(nodeId!);
  });

  const renderEditForm = (trigger: ReactElement<any>) => {
    if (!editForm) {
      return null;
    }
    return (
      <ModalForm
        okText="Save"
        trigger={trigger}
        formData={formData}
        width={editForm.width}
        onSubmit={onSaveNodeData}
        title={editForm.title || 'Edit Node'}
        children={form => <editForm.Component form={form} />}
      />
    );
  }

  return (
    <NodeWrapperContext.Provider
      value={{
        renderEditForm,
        openCanvasDetail
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.tools}>
          {!!tools && nodeId && (
            <Tools
              tools={tools}
              nodeId={nodeId}
            />
          )}
        </div>
        <div className={styles.inner}>
          {enableTarget && (
            <Handle
              type="target"
              id={DefaultTargetId}
              position={Position.Left}
              className={styles.handle}
              isConnectableStart={false}
            />
          )}
          <div className={styles.content}>
            {props.children}
          </div>
          {enableSource && (
            <Branch
              branch={branch}
              onChange={addNode}
            />
          )}
          {top && (
            <div className={styles.enter_next_wrapper}>
              <div className={styles.enter_next}>
                <div
                  onClick={openCanvasDetail}
                  className={styles.enter_btn}
                >
                  <WEnterIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </NodeWrapperContext.Provider>
  );
};

export default NodeWrapper;
