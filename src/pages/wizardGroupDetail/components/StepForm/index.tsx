import { type FC } from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import { ProFormText } from '@ant-design/pro-components';
import SchemaForm from './schemaForm';
import type { FormListAction, WizardSchemaType } from '../../types';
import MoreMenu from './moreMenu';
import styles from './styles.module.less';

export type StepFormProps = {
  index: number;
  count: number;
  action: FormListAction;
}

const StepForm: FC<StepFormProps> = (props) => {
  const { action, index } = props;

  const {
    attributes,
    attributeGroups,
    wizardSchemaDescription
  } = action.getCurrentRowData() as WizardSchemaType;

  return (
    <Card
      title={`Step ${index + 1}`}
      className={classNames(styles.step_card, 'shopify')}
      extra={<MoreMenu {...props} />}
    >
      <div className={styles.group_title}>
        Block - {wizardSchemaDescription}
      </div>
      <ProFormText hidden name="wizard_uuid" />
      <ProFormText hidden name="wizard_type" />
      <ProFormText hidden name="wizard_schema_type" />
      <ProFormText hidden name="wizard_schema_name" />
      <ProFormText
        name="wizard_title"
        label="Step title"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        name="wizard_description"
        label="Step description"
        rules={[
          { required: true }
        ]}
      />
      {attributeGroups.map(item => {
        const schema = attributes.filter(attr => {
          return attr.group_name === item.name;
        });
        return (
          <div className={styles.group} key={item.name}>
            <div className={styles.group_title}>
              {item.label}
            </div>
            <div className={styles.group_content}>
              <SchemaForm name="schemaFormData" schema={schema} />
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default StepForm;