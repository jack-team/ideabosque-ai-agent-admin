import type { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getContactRequestsApi } from '@/services/contactProfiles';

const Places: FC = () => {
  const navigate = useNavigate()
  return (
    <PageContainer
      className="shopify"
      title="Contact Requests"
      onBack={() => navigate(-1)}
    >
      <ProTable
        size="small"
        className="shopify"
        rowKey="requestUuid"
        search={false}
        options={false}
        columns={[
          {
            title: 'Request UUID',
            dataIndex: 'requestUuid'
          },
          {
            title: 'Contact UUID',
            dataIndex: 'contactUuid'
          },
          {
            title: 'Request Title',
            dataIndex: 'requestTitle'
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
            render: (_, record) => {
              return (
                <TriggerModal
                  title="Contact Request"
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
              );
            }
          }
        ]}
        request={async (params) => {
          const {
            placeList: result
          } = await getContactRequestsApi({
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