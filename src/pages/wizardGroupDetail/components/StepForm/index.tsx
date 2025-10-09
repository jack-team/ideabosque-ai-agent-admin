import { type FC, Fragment } from 'react';
import { ProFormText, ProFormDependency } from '@ant-design/pro-components';
import MenuItems from './menuItems';
import { BlockTypes, BlockTypesMap } from '../../enum';
import styles from './styles.module.less';

type WizardType = keyof typeof BlockTypesMap;

const StepForm: FC = () => {
  return (
    <Fragment>
      <ProFormDependency name={['wizard_type']}>
        {({ wizard_type }) => {
          return (
            <div className={styles.title}>
              Block - {BlockTypesMap[wizard_type as WizardType]?.label}
            </div>
          );
        }}
      </ProFormDependency>
      <ProFormText
        name="wizard_title"
        label="Step title"
      />
      <ProFormText
        name="wizard_description"
        label="Step description"
      />
      <ProFormText
        name="wizard_type"
        label="Step type"
      />
      <ProFormDependency name={['wizard_type']}>
        {({ wizard_type }) => {
          switch (wizard_type) {
            case BlockTypes.FormFields: {
              return <MenuItems />;
            }
            case BlockTypes.MultipleChoice: {
              return <MenuItems showAddBtn={false} />;
            }
          }
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default StepForm;