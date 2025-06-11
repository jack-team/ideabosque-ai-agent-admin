import type { FC } from 'react';
import * as Icons from '@ant-design/icons';
import TriggerModal from '@/components/TriggerModal';
import DynamicForm from '../DynamicForm';
import nodes from './nodes.json';
import type { ResultType } from './types';
import styles from './styles.module.less';

type SelectNodesProps = {
  onNodeClick?: (result: ResultType) => void;
}

const SelectNodes: FC<SelectNodesProps> = (props) => {
  const { onNodeClick } = props;

  return (
    <div className={styles.nodes}>
      {nodes.map(item => {
        //@ts-ignore
        const Icon = Icons[item.icon];
        return (
          <TriggerModal
            key={item.type}
            title={item.title}
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
                onNodeClick?.({
                  ...values,
                  nodeType: item.type
                });
              }}
            />
          </TriggerModal>
        );
      })}
    </div>
  );
}

export default SelectNodes;