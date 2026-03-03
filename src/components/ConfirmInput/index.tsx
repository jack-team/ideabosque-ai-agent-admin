import type { FC } from 'react';
import { Input } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useLang  } from '@/hooks/useLang';
import styles from './styles.module.less';

type ConfirmInputProps = {
  onConfirm?: (isConfirm: boolean) => void;
}

const ConfirmInput: FC<ConfirmInputProps> = (props) => {
  const { t } = useLang();
  const onChange = useMemoizedFn((e: any) => {
    const val = e.target.value;
    props.onConfirm?.(val === 'confirm');
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('common.inputConfirmTipText')}</div>
      <Input placeholder="confirm" onInput={onChange} />
    </div>
  );
}

export default ConfirmInput;