import { type FC, Fragment } from 'react';
import * as uuid from 'uuid';
import { useMemoizedFn } from 'ahooks';
import { useReactFlow } from '@xyflow/react';
import AtomNode from '../AtomNode';
import AtomModalForm from '../ModalForm';
import { nodeList } from './configs';

type NodesProps = {
  closeDrawer?: () => void;
}

const Nodes: FC<NodesProps> = (props) => {
  const { addNodes, getNodes } = useReactFlow();

  const handleAddNode = useMemoizedFn((type: string, formData: Record<string, any>) => {
    const nodes = getNodes();

    addNodes({
      type,
      id: uuid.v4(),
      position: {
        x: 0,
        y: 0
      },
      data: {
        formData,
        nodeType: type
      }
    })
  })

  return (
    <Fragment>
      {nodeList.map(config => {
        const {
          nodeType,
          form: Form,
          ...reset
        } = config;

        return (
          <AtomModalForm
            key={nodeType}
            okText="Add Node"
            title={`Add ${reset.title}`}
            trigger={<AtomNode {...reset} />}
            onSubmit={async (formData) => {
              handleAddNode(nodeType, formData)
              props.closeDrawer?.();
            }}
          >
            {form => <Form form={form} />}
          </AtomModalForm>
        );
      })}
    </Fragment>
  );
}

export default Nodes;