import type { FC } from 'react';
import classNames from 'classnames';
import { useRequest } from 'ahooks';
import { LoadingOutlined } from '@ant-design/icons';
import { getAwsFileUrl } from './helper';
import styles from './styles.module.less';


type AwsImageProps = {
  awsKey: string;
  className?: string;
};

export const AwsImage: FC<AwsImageProps> = (props) => {
  const { awsKey, className, } = props;
  const { data, loading } = useRequest(() => getAwsFileUrl(awsKey));

  return (
    <div className={classNames(styles.container, className)}>
      {loading ?
        <LoadingOutlined /> :
        <img src={data} alt={awsKey} />
      }
    </div>
  )
}



