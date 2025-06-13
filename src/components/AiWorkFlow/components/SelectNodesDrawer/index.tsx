import { Drawer } from 'antd';
import { Fragment } from 'react';
import { useMemoizedFn } from 'ahooks';
import type { FC, ReactElement } from 'react';
import { useTriggerState } from '@/hooks/useTriggerState';
import SelectNodes from './nodes';
import type { ResultType } from './types';

type SelectNodesDrawerProps = {
  title?: string;
  trigger: ReactElement;
  onChange?: (result: ResultType) => void;
}

const SelectNodesDrawer: FC<SelectNodesDrawerProps> = (props) => {
  const {
    open,
    trigger,
    onClose
  } = useTriggerState(props.trigger);

  const handleChange = useMemoizedFn((result: ResultType) => {
    onClose();
    props.onChange?.(result);
  });

  return (
    <Fragment>
      <Drawer
        open={open}
        width={320}
        destroyOnHidden
        title={props.title}
        onClose={onClose}
        rootClassName="shopify"
      >
        <SelectNodes onNodeClick={handleChange} />
      </Drawer>
      {trigger}
    </Fragment>
  );
}

export default SelectNodesDrawer;