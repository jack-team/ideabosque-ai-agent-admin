import { type FC, Fragment } from 'react';
import { useNodes } from '@xyflow/react';
import AtomNode from '../AtomNode';
import ModalForm from '../ModalForm';
import { useCanvasInnerContext } from '../../hooks';
import { customNodes } from '../../nodes'
import type { NodesProps } from './types';

const Nodes: FC<NodesProps> = (props) => {
  const nodes = useNodes();
  const { closeDrawer, onChange, triggerId } = props;
  const { top } = useCanvasInnerContext();

  return (
    <Fragment>
      {customNodes.filter(n => {
        if (top) return n.top;
        if (n.top) return false;

        if (n.limit !== undefined) {
          const result = nodes.filter(node =>
            node.type === n.type
          );
          return result.length < n.limit;
        }
        return true;
      }).map(config => {
        const {
          type: nodeType,
          Component,
          ...reset
        } = config;

        const Icon = Component.Icon;
        const Form = Component.Form;

        const handleChange = async (formData: Record<string, any> = {}) => {
          closeDrawer();
          onChange?.({ nodeType, triggerId, formData });
        }

        if (Form) {
          return (
            <ModalForm
              key={nodeType}
              okText="Add Node"
              onSubmit={handleChange}
              width={Component.modalWdith}
              title={`Add ${reset.title} Node`}
              children={form => <Form form={form} />}
              trigger={<AtomNode {...reset} Icon={Icon} />}
            />
          );
        } else {
          return (
            <AtomNode
              {...reset}
              Icon={Icon}
              key={nodeType}
              onClick={handleChange}
            />
          );
        }
      })}
    </Fragment>
  );
}

export default Nodes;