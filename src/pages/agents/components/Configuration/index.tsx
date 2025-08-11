import { type FC } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import TriggerModal, { } from '@/components/TriggerModal';
import type { ConfigurationProps } from './types';
import SchemaForm from './schemaForm';
import styles from './styles.module.less';

const Configuration: FC<ConfigurationProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <TriggerModal
        width={700}
        title="Edit Config"
        destroyOnHidden
        trigger={
          <Button
            icon={<EditFilled />}
            className="shopify"
          >
            Edit Config
          </Button>
        }
      >
        <SchemaForm {...props} />
      </TriggerModal>
    </div>
  );
}

export default Configuration;