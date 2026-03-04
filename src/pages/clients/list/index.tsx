import type { FC } from 'react';
import { PlusIcon } from '@shopify/polaris-icons';
import { useLang } from '@/hooks/useLang';
import Button from '@/components/Button';
import { withIcon } from '@/components/IconButton';
import PageContainer from '@/components/PageContainer';
import Table from '@/components/Table';
import TriggerModal from '@/components/TriggerModal';
import { ProCard } from '@ant-design/pro-components';
import EditForm from './edit';

const WPlusIcon = withIcon(PlusIcon);

const ClientList: FC = () => {
  const { t } = useLang();

  return (
    <PageContainer
      fullScreen
      title={t('clients.clients')}
    >
      <ProCard
        title="客户端集成"
        subTitle="客户端集成可以将页面与智能体进行绑定，能快速的将智能体集成到Shopify等Web应用中。"
        extra={
          <TriggerModal 
          title="新建客户端集成"
          trigger={
            <Button
              type="link"
              icon={<WPlusIcon />}
            >
              新建客户端集成
            </Button>
          }>
            <EditForm />
          </TriggerModal>
        }
      >
        <Table
          fullScreen
          search={false}
          options={false}
          columns={[
            {
              dataIndex: 'clientId',
              title: 'Client ID'
            },
            {
              dataIndex: 'title',
              title: '集成标题'
            },
            {
              dataIndex: 'platform',
              title: '集成平台'
            },
            {
              dataIndex: 'description',
              title: '集成描述'
            },
            {
              title: t('common.createdAt'),
              dataIndex: 'createdAt',
              hideInSearch: true,
            },
            {
              title: t('common.updatedAt'),
              dataIndex: 'updatedAt',
              hideInSearch: true,
            },
            {
              title: t('common.actions'),
              key: 'actions',
              align: 'center',
              fixed: 'right',
              hideInSearch: true,
              width: 120,
            }
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}

export default ClientList;