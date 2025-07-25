import { type FC, Fragment } from 'react';
import AtomNode from '../AtomNode';
import ModalForm from '../ModalForm';
import { nodeList } from './configs';
import type { NodesProps } from './types';

const Nodes: FC<NodesProps> = (props) => {
  const { closeDrawer, onChange, triggerId } = props;

  return (
    <Fragment>
      {nodeList.map(config => {
        const {
          nodeType,
          form: Form,
          ...reset
        } = config;

        return (
          <ModalForm
            key={nodeType}
            okText="Add Node"
            title={`Add ${reset.title}`}
            trigger={<AtomNode {...reset} />}
            onSubmit={async (formData) => {
              closeDrawer();
              onChange?.({
                nodeType,
                triggerId,
                formData
              });
            }}
          >
            {form => <Form form={form} />}
          </ModalForm>
        );
      })}
    </Fragment>
  );
}

export default Nodes;