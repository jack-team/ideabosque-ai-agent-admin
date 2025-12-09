import { type FC, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Slider } from 'antd';
import styles from './styles.module.less';

type ColorPickerInputProps = {
  value?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value?: string) => void;
}

const ColorPickerInput: FC<ColorPickerInputProps> = (props) => {
  const { value = '0px', unit = 'px', onChange } = props;

  const newVal = useMemo(() => {
    const reg = new RegExp(unit);
    const val = value.replace(reg, '');
    if (val) return +val;
  }, [value]);

  const handleChange = useMemoizedFn(
    (val: number) => {
      onChange?.(`${val}${unit}`);
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Slider
          value={newVal}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={handleChange}
        />
      </div>
      <div className={styles.val}>
        {value ?? '--'}
      </div>
    </div>
  )
}

export default ColorPickerInput;

