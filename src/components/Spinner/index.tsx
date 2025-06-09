import type { FC } from "react";
import Svg from "./spinner.svg?react";
import type { SpinnerProps } from './types';
import "./styles.less";

const Spinner: FC<SpinnerProps> = (props) => {
  const { size = 24 } = props;
  return (
    <div
      className="global-spinner"
      style={{ width: size, height: size }}
    >
      <Svg />
    </div>
  );
}

export default Spinner;