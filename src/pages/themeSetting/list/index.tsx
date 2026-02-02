import { type FC, useRef, Fragment } from 'react';
import { useMemoizedFn } from 'ahooks';
import { type MenuProps, Dropdown, App } from 'antd';
import { type ActionType } from '@ant-design/pro-components';
import Button from '@/components/Button';
import { useNavigate } from 'react-router';
import IconButton, { withIcon } from '@/components/IconButton';
import { EditIcon, DeleteIcon, AlertCircleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import PageContainer from '@/components/PageContainer';
import Table from '@/components/Table';
import TriggerModal from '@/components/TriggerModal';
import EditForm from './edit';
import { formatDate } from '@/utils';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { getThemeSettingListApi, deleteThemeSettingApi } from '@/services/themeSetting';

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const ThemeSettings: FC = () => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

  const handleArchive = useMemoizedFn(
    (record: ThemeSettingDataType) => {
      modal.confirm({
        title: 'Are you sure you want to delete?',
        okText: 'Delete',
        onOk: async () => {
          try {
            await deleteThemeSettingApi({
              themeUuid: record.themeUuid
            });
            onRefresh();
            message.success('Deletion successful.');
          } catch (err) {
            message.error('Deletion failed.');
            return Promise.reject(err);
          }
        }
      });
    }
  );

  return (
    <PageContainer
      fullScreen
      title="Themes"
      extra={
        <TriggerModal
          title="Create new theme"
          trigger={
            <Button type="primary">
              Create New theme
            </Button>
          }
        >
          <EditForm />
        </TriggerModal>
      }
    >
      <Table
        search={false}
        rowKey="themeUuid"
        actionRef={actionRef}
        toolBarRender={false}
        request={getThemeSettingListApi}
        columns={[
          {
            dataIndex: 'themeTitle',
            title: 'Theme name'
          },
          {
            dataIndex: 'themeDescription',
            title: 'Theme description'
          },
          {
            dataIndex: 'updatedAt',
            title: 'Last Updated',
            render: val => formatDate(val)
          },
          {
            width: '100px',
            dataIndex: 'actions',
            title: 'Actions',
            render: (_, record) => {
              let detailTrigger: HTMLSpanElement | null = null;

              const items: MenuProps['items'] = [
                {
                  key: 'edit',
                  icon: <WEditIcon />,
                  label: 'Edit Theme',
                  onClick: () => navigate(`/theme/detail/${record.themeUuid}`)
                },
                {
                  key: 'details',
                  label: (
                    <span>
                      View details
                    </span>
                  ),
                  icon: <WAlertCircleIcon />,
                  onClick: () => detailTrigger?.click()
                },
                {
                  danger: true,
                  key: 'delete',
                  label: 'Delete',
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
                    title="Theme details"
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