import type { FC, ReactElement } from 'react';
import { Drawer } from 'antd';
import { useReactFlow } from '@xyflow/react';
import { useTriggerState } from '@/hooks/useTriggerState';
import Nodes from './nodes';

type SelectNodeDrawerProps = {
  children: ReactElement<any>;
}

const SelectNodeDrawer: FC<SelectNodeDrawerProps> = (props) => {
  const { children } = props;
  const { addNodes } = useReactFlow();
  const { open, trigger, onClose } = useTriggerState(children);

  return (
    <>
      {trigger}
      <Drawer
        open={open}
        destroyOnHidden
        onClose={onClose}
        rootClassName="shopify"
        title="What triggers this workflow?"
      >
        <Nodes />
      </Drawer>
    </>
  )
}

export default SelectNodeDrawer;