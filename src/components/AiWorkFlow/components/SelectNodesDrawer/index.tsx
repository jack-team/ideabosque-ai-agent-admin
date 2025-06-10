import { Drawer } from 'antd';
import { cloneElement, Fragment } from 'react';
import type { FC, ReactElement } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import SelectNodes from './nodes';

type SelectNodesDrawerProps = {
  trigger: ReactElement;
  title?: string;
}

const SelectNodesDrawer: FC<SelectNodesDrawerProps> = (props) => {
  const [open, setOpen] = useSafeState(false);

  const handleOpen = useMemoizedFn(() => {
    setOpen(true);
  });

  const handleClose = useMemoizedFn(() => {
    setOpen(false);
  });

  return (
    <Fragment>
      <Drawer
        open={open}
        title={props.title}
        onClose={handleClose}
        rootClassName="shopify"
      >
        <SelectNodes />
      </Drawer>
      {cloneElement(props.trigger, {
        //@ts-ignore
        onClick: handleOpen
      })}
    </Fragment>
  );
}

export default SelectNodesDrawer;