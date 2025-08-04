import type { FC } from 'react';
import { Button } from 'antd';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';

const Coordinations: FC = () => {
  return (
    <PageContainer
      className="shopify"
      title="Coordinations"
      extra={
        <TriggerModal
          className="shopify"
          title="Create Coordination"
          trigger={
            <Button
              className="shopify"
              type="primary"
            >
              Create coordination
            </Button>
          }
        >
          <EditFrom />
        </TriggerModal>
      }
    >

      <ProTable
        className="shopify"
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Coordination UUID',
            dataIndex: 'a'
          },
          {
            title: 'Coordination Name',
            dataIndex: 'b'
          },
          {
            title: 'Create at',
            dataIndex: 'createAt',
            render: (_, e) => formatDate(e.createAt)
          },
          {
            title: 'Update at',
            dataIndex: 'updateAt',
            render: (_, e) => formatDate(e.updateAt)
          },
          {
            title: 'Action',
            key: 'action'
          }
        ]}
      />
    </PageContainer>
  );
}

export default Coordinations;