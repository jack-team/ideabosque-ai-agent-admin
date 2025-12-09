import { type FC, memo, type RefObject } from 'react';
import { ProFormList, type FormListActionType } from '@ant-design/pro-components';
import type { WizardSchemaType } from './types';
import StepForm from './components/StepForm';
import styles from './styles.module.less';

type WizardsProps = {
  actionRef: RefObject<FormListActionType | undefined>;
}

const Wizards: FC<WizardsProps> = (props) => {
  return (
    <ProFormList<WizardSchemaType>
      name="wizards"
      initialValue={[]}
      alwaysShowItemLabel
      copyIconProps={false}
      actionRef={props.actionRef}
      deleteIconProps={false}
      creatorButtonProps={false}
      className={styles.form_list}
      style={{ marginBottom: 0 }}
    >
      {(_, index, action, count) => {
        return (
          <StepForm
            index={index}
            count={count}
            action={action}
          />
        )
      }}
    </ProFormList>
  );
}

export default memo(Wizards);