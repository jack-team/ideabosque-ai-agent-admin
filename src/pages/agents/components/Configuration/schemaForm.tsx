import { type FC } from 'react';
import { } from '@/components/TriggerModal';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { SchemaTypes } from './types';
import { transfromSchema } from './helper';
import styles from './styles.module.less';

type SchemaFormProps = {
  schema: SchemaTypes;
}

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { schema } = props;
  return (
    <BetaSchemaForm
      submitter={false}
      className={styles.container}
      columns={transfromSchema(schema)}
    />
  );
}

export default SchemaForm;