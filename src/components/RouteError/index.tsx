import { Result, Button } from 'antd';
import { useNavigate } from '@/hooks/useNavigate';
import { useLang } from '@/hooks/useLang';
import { useMemoizedFn } from 'ahooks';
import styles from './styles.module.less';

const RouteError = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  const refreshPage = useMemoizedFn(() => {
    location.reload();
  })

  const backHomePage = useMemoizedFn(() => {
    navigate('/', { replace: true });
  });

  return (
    <div className={styles.error_page}>
      <Result
        status="500"
        title={t(`common.Oops, the server is down`)}
        subTitle={t(`common.We apologize for the inconvenience You can take the following actions`)}
        extra={[
          <Button
            key="back"
            onClick={backHomePage}
          >
            {t('common.Return to Home')}
          </Button>,
          <Button
            type="primary"
            key="refresh"
            onClick={refreshPage}
          >
            {t('common.Refresh the page')}
          </Button>
        ]}
      />
    </div>
  );
};

export default RouteError;