import type { FC } from 'react';
import { Slider } from 'antd';
import styles from './styles.module.less';

type ColorPickerInputProps = {
  value?: number;
  onChange?: (value?: number) => void;
}

const ColorPickerInput: FC<ColorPickerInputProps> = (props) => {
  const { value = 0 } = props;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Slider
          min={10}
          max={100}
          value={value}
          onChange={props.onChange}
        />
      </div>
      <div className={styles.val}>
        {value ?? '--'}
      </div>
    </div>
  )
}

export default ColorPickerInput;

