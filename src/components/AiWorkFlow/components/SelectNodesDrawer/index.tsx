import { Drawer } from 'antd';
import { Fragment } from 'react';
import type { FC, ReactElement } from 'react';
import { useTriggerState } from '@/hooks/useTriggerState';
import SelectNodes from './nodes';

type SelectNodesDrawerProps = {
  trigger: ReactElement;
  title?: string;
  onChange?: (
    nodeType: string,
    formData: Record<string, any>
  ) => void;
}

const SelectNodesDrawer: FC<SelectNodesDrawerProps> = (props) => {
  const {
    open,
    trigger,
    onClose
  } = useTriggerState(props.trigger);

  return (
    <Fragment>
      <Drawer
        open={open}
        width={400}
        mask={false}
        destroyOnHidden
        title={props.title}
        onClose={onClose}
        rootClassName="shopify"
      >
        <SelectNodes
          onNodeClick={props.onChange}
        />
      </Drawer>
      {trigger}
    </Fragment>
  );
}

export default SelectNodesDrawer;