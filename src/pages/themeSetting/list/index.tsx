import { type FC, useRef, Fragment } from 'react';
import { useMemoizedFn } from 'ahooks';
import { type MenuProps, Dropdown } from 'antd';
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
import { getThemeSettingListApi } from '@/services/themeSetting';

const WEditIcon = withIcon(EditIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WAlertCircleIcon = withIcon(AlertCircleIcon);

const ThemeSettings: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>(null);

  const onRefresh = useMemoizedFn(() => {
    actionRef.current?.reloadAndRest?.();
  });

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
            key: 'themeName',
            title: 'Theme name',
            render: (_, record) => {
              return record.setting.themeName;
            }
          },
          {
            key: 'themeDescription',
            title: 'Theme description',
            render: (_, record) => {
              return record.setting.themeDescription;
            }
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
                  onClick: () => {

                  }
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