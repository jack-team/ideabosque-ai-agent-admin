import { type FC, memo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import StepFormFields from './stepFormFields';
import type { FormListAction, WizardSchemaType } from '@/typings/wizardGroup';
import MoreMenu from './moreMenu';
import styles from './styles.module.less';

export type StepFormProps = {
  index: number;
  count: number;
  action: FormListAction;
}

const StepForm: FC<StepFormProps> = (props) => {
  const { action, index } = props;

  const getRowData = useMemoizedFn(() => {
    return action.getCurrentRowData() as WizardSchemaType;
  });

  const title = ` Block - ${getRowData().wizardSchemaDescription}`;

  return (
    <ProCard
      className={styles.step_card}
      extra={<MoreMenu {...props} />}
      title={<span className={styles.step_num}>{`Step ${index + 1}`}</span>}
    >
      <div className={styles.group_title}>{title}</div>
      <StepFormFields getRowData={getRowData} />
    </ProCard>
  );
}

export default memo(StepForm);