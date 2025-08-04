import type { FC } from 'react';
import { Button, Space } from 'antd';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getPlacesApi } from '@/services/contactProfiles';

const Places: FC = () => {
  return (
    <PageContainer
      className="shopify"
      title="Places"
    >
      <ProTable
        size="small"
        className="shopify"
        search={false}
        options={false}
        columns={[
          {
            title: 'Place UUID',
            dataIndex: 'placeUuid'
          },
          {
            title: 'Business Name',
            dataIndex: 'businessName'
          },
          {
            title: 'Region',
            dataIndex: 'region'
          },
          {
            title: 'Website',
            dataIndex: 'website'
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
            key: 'action',
            render: () => {
              return (
                <Button
                  className="shopify"
                  size="small"
                >
                  View
                </Button>
              )
            }
          }
        ]}
        request={async (params) => {
          const {
            placeList: result
          } = await getPlacesApi({
            pageNumber: params.current,
            limit: params.pageSize
          });
          return {
            data: result.placeList,
            total: result.total
          }
        }}
      />
    </PageContainer>
  );
}

export default Places;