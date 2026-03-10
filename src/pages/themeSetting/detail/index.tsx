import { type FC, useRef } from 'react';
import { App } from 'antd';
import { useRequest, useMemoizedFn, useSafeState } from 'ahooks';
import { useParams } from 'react-router';
import { useNavigate } from '@/hooks/useNavigate';
import PageContainer from '@/components/PageContainer';
import SpinBox from '@/components/SpinBox';
import ShopifyButton from '@/components/Button';
import ThemeEditor from '../themeEditor';
import type { ThemeEditorActionType } from '../themeEditor/types';
import { getThemeSettingApi, insertUpdateThemeSettingApi } from '@/services/themeSetting';
import { getPartId } from '@/env';
import { useLang } from '@/hooks/useLang';
import styles from './styles.module.less';

const ThemeDetail: FC = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  const { message } = App.useApp();
  const [submiting, setSubmiting] = useSafeState(false);
  const actionRef = useRef<ThemeEditorActionType>(null);
  const { themeUuid } = useParams<{ themeUuid: string }>();

  const {
    data,
    loading,
  } = useRequest(async () => {
    return getThemeSettingApi({
      themeUuid: themeUuid!
    });
  });

  const handleSave = useMemoizedFn(async () => {
    const settingData = actionRef.current?.getThemeData();
    try {
      setSubmiting(true);
      await insertUpdateThemeSettingApi({
        updatedBy: getPartId(),
        themeUuid: themeUuid!,
        themeType: 'chatbotTheme',
        setting: settingData
      });
      message.success(t('common.Saved successfully'));
    } catch (err) {
      message.error(t('common.Failed to save, please contact the administrator'));
    }
    setSubmiting(false);
  });

  return (
    <SpinBox loading={loading} alpha={.5}>
      <PageContainer
        fullScreen
        title={t('theme.Theme Editor')}
        subTitle={data?.themeTitle ? `(${data?.themeTitle})` : null}
        onBack={() => navigate('/theme', { replace: true })}
        extra={
          <ShopifyButton
            type="primary"
            onClick={handleSave}
            loading={submiting}
          >
            {t('common.save')}
          </ShopifyButton>
        }
      >
        <div className={styles.container}>
          {data ? (
            <ThemeEditor
              ref={actionRef}
              themeData={data.setting}
            />
          ) : null}
        </div>
      </PageContainer>
    </SpinBox>
  );
}

export default ThemeDetail;