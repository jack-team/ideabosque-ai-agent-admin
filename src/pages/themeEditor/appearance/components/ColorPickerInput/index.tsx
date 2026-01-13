import type { FC } from 'react';
import { ColorPicker } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import styles from './styles.module.less';

type ColorPickerInputProps = {
  value?: string;
  onChange?: (value?: string) => void;
}

const prefixs = ['var', 'linear-gradient'];

const ColorPickerInput: FC<ColorPickerInputProps> = (props) => {
  const { value } = props;

  let newVal = value;

  if (prefixs.some(p => newVal?.startsWith(p))) {
    newVal = undefined;
  }

  const [open, setOpen] = useSafeState(false);

  const handleChange = useMemoizedFn((e: any) => {
    props.onChange?.(e.toHexString());
  });

  const onClick = useMemoizedFn(() => setOpen(true));

  return (
    <div className={styles.container}>
      <ColorPicker
        value={newVal}
        size="large"
        open={open}
        onOpenChange={setOpen}
        onChange={handleChange}
      />
      <div
        onClick={onClick}
        title={value}
        className={styles.val}
      >
        <div>{value || '--'}</div>
      </div>
    </div>
  )
}

export default ColorPickerInput;

