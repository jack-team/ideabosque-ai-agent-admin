import { type FC, Fragment } from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import { getFormNamePath } from '../../helper';
import UploadInput from '@/components/UploadInput';
import styles from './styles.module.less';

const getName = (names: string[]) => {
  return getFormNamePath("confirmation", names);
}

const Confirmation: FC = () => {
  return (
    <Fragment>
      <div className={styles.title}>
        Confirmation image
      </div>
      <ProFormItem
        name={getName(["image"])}
        rules={[
          {
            required: true,
            message: 'Please upload Confirmation image'
          }
        ]}
      >
        <UploadInput namespace="confirmation_image" />
      </ProFormItem>
    </Fragment>
  );
}

export default Confirmation;