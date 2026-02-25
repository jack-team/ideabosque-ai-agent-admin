import { Drawer } from 'antd';
import type { FC } from 'react';
import { useLang } from '@/hooks/useLang';
import { useTriggerState } from '@/hooks/useTriggerState';
import Nodes from './nodes';
import type { SelectNodeDrawerProps } from './types'

const SelectNodeDrawer: FC<SelectNodeDrawerProps> = (props) => {
  const { children, ...reset } = props;
  const { t } = useLang();

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
        title={t('flowCanvas.What triggers this workflow')}
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