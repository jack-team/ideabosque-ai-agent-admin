import * as Icons from '@ant-design/icons';
import type { FC } from 'react';
import TriggerModal from '@/components/TriggerModal';
import DynamicForm from '../DynamicForm';
import components from '../../components.json';
import styles from './styles.module.less';

type SelectNodesProps = {
  onNodeClick?: (
    nodeType: string,
    formData: Record<string, any>
  ) => void;
}

const SelectNodes: FC<SelectNodesProps> = (props) => {
  return (
    <div className={styles.nodes}>
      {components.map(item => {
        //@ts-ignore
        const Icon = Icons[item.icon];
        return (
          <TriggerModal
            key={item.type}
            title={item.title}
            width={item.modalWidth}
            destroyOnHidden
            okText="Confirm"
            trigger={
              <div className={styles.node_item}>
                <div className={styles.icon}>
                  <Icon />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>
                    {item.title}
                  </div>
                  <div className={styles.desc}>
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
                props.onNodeClick?.(item.type, values);
              }}
            />
          </TriggerModal>
        );
      })}
    </div>
  );
}

export default SelectNodes;