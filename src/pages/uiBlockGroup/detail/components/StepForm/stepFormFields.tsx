import { type FC, memo } from 'react';
import classNames from 'classnames';
import { useLang, useExists } from '@/hooks/useLang';
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

  const { t } = useLang();
  const [exists] = useExists();

  return (
    <>
      <ProFormText hidden name="wizardUuid" />
      <ProFormText hidden name="wizardType" />
      <ProFormText hidden name="wizardSchemaType" />
      <ProFormText hidden name="wizardSchemaName" />
      <ProFormText
        name="wizardTitle"
        label={t('uiBlockGroup.Step title')}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="wizardDescription"
        label={t('uiBlockGroup.Step description')}
        rules={[{ required: true }]}
      />
      {attributeGroups.map(item => {
        const schema = attributes.filter(attr => attr.groupName === item.name);
        const [laster] = schema;

        const isRequired = schema.length === 1 && laster.required && !laster.label;
        const className = classNames(styles.group_title, isRequired && styles.required);

        const tKey = `uiBlockGroup.${item.label}`;

        return (
          <div
            key={item.name}
            className={styles.group}
          >
            <div className={className}>
              {exists(tKey) ? t(tKey) : item.label}
            </div>
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