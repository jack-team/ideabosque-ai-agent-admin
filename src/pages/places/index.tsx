import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getPlacesApi } from '@/services/contactProfiles';

const Places: FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      className="shopify"
      title="Addresses"
      onBack={() => navigate(-1)}
    >
      <ProTable
        size="small"
        rowKey="placeUuid"
        className="shopify"
        pagination={{
          defaultPageSize: 5
        }}
        scroll={{ x: 'max-content' }}
        search={false}
        options={false}
        columns={[
          {
            title: 'Address UUID',
            dataIndex: 'placeUuid'
          },
          {
            title: 'Business Name',
            dataIndex: 'businessName'
          },
          {
            title: 'Website',
            dataIndex: 'website'
          },
          {
            title: 'Region',
            dataIndex: 'region'
          },
          {
            title: 'Create at',
            dataIndex: 'createAt',
            render: (_, e) => formatDate(e.createAt)
          },
          {
            title: 'Last updated',
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
                  width={620}
                  title="Address Details"
                  hasFooter={false}
                  trigger={<IconButton icon={ViewIcon} />}
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