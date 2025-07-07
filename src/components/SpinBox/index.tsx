import type { FC, ReactElement } from 'react';
import Spinner from '../Spinner';
import './styles.less';

type SpinBoxProps = {
  loading?: boolean;
  children?: ReactElement | ReactElement[] | null;
}

const SpinBox: FC<SpinBoxProps> = (props) => {
  const { loading = false, children } = props;
  return (
    <div className="spin-box">
      {children}
      {loading ? (
        <div className="spin-box-loading">
          <Spinner size={48} />
        </div>
      ) : null}
    </div>
  )
}

export default SpinBox;