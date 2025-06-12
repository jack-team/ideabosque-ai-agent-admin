import type { FC } from 'react';
import { useMemo } from 'react';
import * as Icons from '@ant-design/icons';
import TriggerModal from '@/components/TriggerModal';
import { useAiWorkFlowContext } from '../../hooks';
import DynamicForm from '../DynamicForm';
import type { ResultType } from './types';
import nodes from '../../nodes.json';
import styles from './styles.module.less';

type SelectNodesProps = {
  onNodeClick?: (result: ResultType) => void;
}

const SelectNodes: FC<SelectNodesProps> = (props) => {
  const { onNodeClick } = props;
  const { role } = useAiWorkFlowContext();

  const nodesFilters = useMemo(() => {
    return nodes.filter(n => {
      return role === 'parent' ?
        n.type === 'step' :
        n.type !== 'step';
    });
  }, [role]);

  return (
    <div className={styles.nodes}>
      {nodesFilters.map(item => {
        //@ts-ignore
        const Icon = Icons[item.icon];
        return (
          <TriggerModal
            key={item.type}
            title={`Add ${item.title} Node`}
            width={item.modalWidth}
            destroyOnHidden
            okText="Add Node"
            trigger={
              <div className={styles.node_item}>
                <div className={styles.node_icon}>
                  <Icon />
                </div>
                <div className={styles.node_item_body}>
                  <div className={styles.node_title}>
                    {item.title}
                  </div>
                  <div className={styles.node_desc}>
                    {item.desc}
                  </div>
                </div>
              </div>
            }
          >
            <DynamicForm
              //@ts-ignore
              schemas={item.formSchema}
              onSubmit={async values => {
                const nodeType = item.type as any;
                onNodeClick?.({ ...values, nodeType });
              }}
            />
          </TriggerModal>
        );
      })}
    </div>
  );
}

export default SelectNodes;