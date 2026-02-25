import { type FC, memo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { useLang, useExists } from '@/hooks/useLang';
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
  const { t } = useLang();
  const [exists] = useExists();

  const getRowData = useMemoizedFn(() => {
    return action.getCurrentRowData() as WizardSchemaType;
  });

  let desc = getRowData().wizardSchemaDescription;
  const tkey = `uiBlockGroup.${desc}`;

  if (exists(tkey)) desc = t(tkey);

  return (
    <ProCard
      className={styles.step_card}
      extra={<MoreMenu {...props} />}
      title={(
        <span className={styles.step_num}>
          {`${t('uiBlockGroup.Step')} ${index + 1}`}
        </span>
      )}
    >
      <div className={styles.group_title}>
        {[t('uiBlockGroup.Block'), desc].join(' - ')}
      </div>
      <StepFormFields getRowData={getRowData} />
    </ProCard>
  );
}

export default memo(StepForm);