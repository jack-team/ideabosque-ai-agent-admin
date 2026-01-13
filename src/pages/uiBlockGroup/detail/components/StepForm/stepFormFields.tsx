import { type FC, memo } from 'react';
import classNames from 'classnames';
import { ProFormText } from '@ant-design/pro-components';
import SchemaForm from './schemaForm';
import type { WizardSchemaType } from '../../types';
import styles from './styles.module.less';

export type StepFormProps = {
  getRowData: () => WizardSchemaType;
}

const StepFormFields: FC<StepFormProps> = (props) => {
  const { getRowData } = props;

  const {
    attributes,
    attributeGroups,
  } = getRowData();

  return (
    <>
      <ProFormText hidden name="wizard_uuid" />
      <ProFormText hidden name="wizard_type" />
      <ProFormText hidden name="wizard_schema_type" />
      <ProFormText hidden name="wizard_schema_name" />
      <ProFormText
        name="wizard_title"
        label="Step title"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="wizard_description"
        label="Step description"
        rules={[{ required: true }]}
      />
      {attributeGroups.map(item => {
        const schema = attributes.filter(attr => attr.group_name === item.name);
        const [laster] = schema;

        const isRequired = schema.length === 1 && laster.required && !laster.label;
        const className = classNames(styles.group_title, isRequired && styles.required);

        return (
          <div
            key={item.name}
            className={styles.group}
          >
            <div className={className}>{item.label}</div>
            <div className={styles.group_content}>
              <SchemaForm name="schemaFormData" schema={schema} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default memo(StepFormFields);