import { type FC, Fragment } from 'react';
import { ProFormText, ProFormDependency } from '@ant-design/pro-components';
import { BlockTypes, BlockTypesMap } from '../../enum';
import MenuItems from './menuItems';
import FileUploader from './fileUploader';
import Scheduler from './scheduler';
import Confirmation from './confirmation';
import styles from './styles.module.less';

type WizardType = keyof typeof BlockTypesMap;
const blockTypeName = ['form_schema', 'blockType'];

const StepForm: FC = () => {
  return (
    <Fragment>
      <ProFormDependency name={blockTypeName}>
        {({ form_schema: schema }) => {
          const type = schema.blockType;
          return (
            <div className={styles.title}>
              Block - {BlockTypesMap[type as WizardType]?.label}
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
        disabled
        name={blockTypeName}
        label="Step type"
      />
      <ProFormDependency name={blockTypeName}>
        {({ form_schema: schema }) => {
          switch (schema.blockType) {
            case BlockTypes.FormFields: {
              return <MenuItems title="Menu items" />;
            }
            case BlockTypes.MultipleChoice: {
              return (
                <MenuItems
                  showAddBtn={false}
                  title="Multiple choice  items"
                />
              );
            }
            case BlockTypes.FileUploader: {
              return <FileUploader />;
            }
            case BlockTypes.Scheduler: {
              return <Scheduler />;
            }
            case BlockTypes.Confirmation: {
              return <Confirmation />;
            }
          }
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default StepForm;