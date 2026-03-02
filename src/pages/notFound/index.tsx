import { Result, Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useNavigate } from '@/hooks/useNavigate';
import { useLang } from '@/hooks/useLang';
import styles from './styles.module.less';

const notFound = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  const backHomePage = useMemoizedFn(() => {
    navigate('/', { replace: true });
  });

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title={t('common.Oops, the page is missing')}
        subTitle={t(`common.The little server pony has temporarily lost its way, and we're working hard to find it`)}
        extra={<Button type="primary" onClick={backHomePage}>{t('common.Return to Home')}</Button>}
      />
    </div>
  );
};

export default notFound;