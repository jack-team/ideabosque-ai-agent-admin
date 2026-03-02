import { type FC, useRef, Fragment } from 'react';
import { useMemoizedFn } from 'ahooks';
import { type MenuProps, Dropdown, App } from 'antd';
import { type ActionType } from '@ant-design/pro-components';
import Button from '@/components/Button';
import { useNavigate } from '@/hooks/useNavigate';
import IconButton, { withIcon } from '@/components/IconButton';
import { EditIcon, DeleteIcon, AlertCircleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import Table from '@/components/Table';
import TriggerModal from '@/components/TriggerModal';
import EditForm from './edit';
import { formatDate } from '@/utils';
import { useLang } from '@/hooks/useLang';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { getThemeSettingListApi, deleteThemeSettingApi } from '@/services/themeSetting';

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const ThemeSettings: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const handleArchive = useMemoizedFn(
    (record: ThemeSettingDataType) => {
      modal.confirm({
        title: t('common.Are you sure you want to delete'),
        okText: t('common.delete'),
        onOk: async () => {
          try {
            await deleteThemeSettingApi({
              themeUuid: record.themeUuid
            });
            onRefresh();
            message.success(t('common.Deleted successfully'));
          } catch (err) {
            message.error(t('common.Failed to delete'));
            return Promise.reject(err);
          }
        }
      });
    }
  );

  const toDetail = useMemoizedFn(
    (data: ThemeSettingDataType) => {
      navigate(`/theme/detail/${data.themeUuid}`);
    }
  );

  return (
    <PageContainer
      fullScreen
      title={t('theme.Themes')}
      extra={
        <TriggerModal
          title={t('theme.Create new theme')}
          trigger={
            <Button type="primary">
              {t('theme.Create new theme')}
            </Button>
          }
        >
          <EditForm onSuccess={toDetail} />
        </TriggerModal>
      }
    >
      <Table
        search={false}
        rowKey="themeUuid"
        actionRef={actionRef}
        toolBarRender={false}
        pagination={{
          defaultPageSize: 20
        }}
        request={getThemeSettingListApi}
        columns={[
          {
            dataIndex: 'themeTitle',
            title: t('theme.Theme name')
          },
          {
            dataIndex: 'themeDescription',
            title: t('theme.Theme description')
          },
          {
            dataIndex: 'updatedAt',
            title: t('common.updatedAt'),
            render: val => formatDate(val)
          },
          {
            width: '100px',
            dataIndex: 'actions',
            title: t('common.actions'),
            render: (_, record) => {
              let detailTrigger: HTMLSpanElement | null = null;

              const items: MenuProps['items'] = [
                {
                  key: 'edit',
                  icon: <WEditIcon />,
                  label: t('theme.Edit Theme'),
                  onClick: () => navigate(`/theme/detail/${record.themeUuid}`)
                },
                {
                  key: 'details',
                  label: (
                    <span>
                      {t('mcpConsole.View details')}
                    </span>
                  ),
                  icon: <WAlertCircleIcon />,
                  onClick: () => detailTrigger?.click()
                },
                {
                  danger: true,
                  key: 'delete',
                  label: t('common.delete'),
                  icon: <WDeleteIcon />,
                  onClick: () => handleArchive(record)
                }
              ];
              return (
                <Fragment>
                  <Dropdown menu={{ items }} >
                    <IconButton icon={MenuHorizontalIcon} />
                  </Dropdown>
                  <TriggerModal
                    title={t('theme.Theme details')}
                    trigger={<span ref={e => { detailTrigger = e }} />}
                  >
                    <EditForm record={record} onSuccess={onRefresh} />
                  </TriggerModal>
                </Fragment>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default ThemeSettings;