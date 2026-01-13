import type { FC } from 'react';
import { EditIcon } from '@shopify/polaris-icons'
import { withIcon } from '@/components/IconButton'
import Button from '@/components/Button';
import TriggerModal from '@/components/TriggerModal';
import SchemaForm from './schemaForm';
import type { ConfigurationProps } from './types';
import styles from './styles.module.less';

const WEditIcon = withIcon(EditIcon);

const Configuration: FC<ConfigurationProps> = (props) => {
  const { schema, value } = props;

  return (
    <div className={styles.container}>
      <TriggerModal
        title={`Edit config(${schema.title})`}
        width={640}
        trigger={
          <Button icon={<WEditIcon />}>
            Edit Config
          </Button>
        }
      >
        <SchemaForm
          schema={schema}
          formData={value}
          onSubmit={props.onChange}
        />
      </TriggerModal>
    </div>
  );
}

export default Configuration;