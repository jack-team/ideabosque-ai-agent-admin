import type { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getPlacesApi } from '@/services/contactProfiles';

const Places: FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      className="shopify"
      title="Places"
      onBack={() => navigate(-1)}
    >
      <ProTable
        size="small"
        rowKey="placeUuid"
        className="shopify"
        scroll={{ x: 'max-content' }}
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
            width: '50px',
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
            width: '80px',
            align: 'center',
            fixed: 'right',
            render: (_, record) => {
              return (
                <TriggerModal
                  title="Place"
                  hasFooter={false}
                  trigger={
                    <Button
                      className="shopify"
                      size="small"
                    >
                      View
                    </Button>
                  }
                >
                  <EditFrom formData={record} />
                </TriggerModal>
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