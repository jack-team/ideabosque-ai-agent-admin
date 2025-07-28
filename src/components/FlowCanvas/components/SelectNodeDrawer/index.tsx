import { Drawer } from 'antd';
import type { FC } from 'react';
import { useTriggerState } from '@/hooks/useTriggerState';
import Nodes from './nodes';
import type { SelectNodeDrawerProps } from './types'

const SelectNodeDrawer: FC<SelectNodeDrawerProps> = (props) => {
  const { children, ...reset } = props;

  const {
    open,
    trigger,
    onClose
  } = useTriggerState(children);

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
        <Nodes
          {...reset}
          closeDrawer={onClose}
        />
      </Drawer>
    </>
  )
}

export default SelectNodeDrawer;