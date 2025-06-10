import type { FC } from "react";
import Svg from "./spinner.svg?react";
import type { SpinnerProps } from './types';
import "./styles.less";

const Spinner: FC<SpinnerProps> = (props) => {
  const { size = 24, color = 'var(--theme-color)' } = props;
  return (
    <div
      className="global-spinner"
      style={{ 
        color,
        width: size, 
        height: size
      }}
    >
      <Svg />
    </div>
  );
}

export default Spinner;