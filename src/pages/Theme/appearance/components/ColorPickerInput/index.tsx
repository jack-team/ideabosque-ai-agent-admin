import type { FC } from 'react';
import { ColorPicker } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import styles from './styles.module.less';

type ColorPickerInputProps = {
  value?: string;
  onChange?: (value?: string) => void;
}

const ColorPickerInput: FC<ColorPickerInputProps> = (props) => {
  const { value } = props;

  const [open, setOpen] = useSafeState(false);

  const handleChange = useMemoizedFn((e: any) => {
    props.onChange?.(e.toHexString());
  });

  const onClick = useMemoizedFn(() => setOpen(true));

  return (
    <div className={styles.container}>
      <ColorPicker
        value={value}
        size="large"
        open={open}
        onOpenChange={setOpen}
        onChange={handleChange}
      />
      <div
        onClick={onClick}
        className={styles.val}
      >
        {value || '--'}
      </div>
    </div>
  )
}

export default ColorPickerInput;

