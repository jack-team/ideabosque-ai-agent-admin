import { type FC, useRef } from 'react';
import { App } from 'antd';
import { useRequest, useMemoizedFn, useSafeState } from 'ahooks';
import { useNavigate, useParams } from 'react-router';
import PageContainer from '@/components/PageContainer';
import { useConfirm } from '@/hooks/useConfirm';
import SpinBox from '@/components/SpinBox';
import ShopifyButton from '@/components/Button';
import ThemeEditor from '../themeEditor';
import type { ThemeEditorActionType } from '../themeEditor/types';
import { getThemeSettingApi, insertUpdateThemeSettingApi } from '@/services/themeSetting';
import { partId } from '@/env';
import styles from './styles.module.less';

const ThemeDetail: FC = () => {
  const navigate = useNavigate();
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
    })
  });

  const handleSave = useMemoizedFn(async () => {
    setSubmiting(true);
    try {
      await insertUpdateThemeSettingApi({
        updatedBy: partId,
        themeUuid: themeUuid!,
        themeType: 'chatbotTheme',
        setting: actionRef.current?.getThemeData()
      });
      message.success('The theme update was successful.');
    } catch (err) {

    }
    setSubmiting(false);
  });

  return (
    <PageContainer
      fullScreen
      title={data?.themeTitle || 'Theme Editor'}
      onBack={() => navigate('/theme', { replace: true })}
      extra={
        <ShopifyButton
          type="primary"
          onClick={handleSave}
          loading={submiting}
        >
          Save
        </ShopifyButton>
      }
    >
      <div className={styles.container}>
        <SpinBox loading={loading} alpha={0}>
          {data ? (
            <ThemeEditor
              ref={actionRef}
              themeData={data.setting}
            />
          ) : null}
        </SpinBox>
      </div>
    </PageContainer>
  );
}

export default ThemeDetail;