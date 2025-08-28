import type { FC } from 'react';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getContactRequestsApi } from '@/services/contactProfiles';

const ContactRequests: FC = () => {
  return (
    <PageContainer
      className="shopify"
      title="Contact Requests"
    >
      <ProTable
        size="small"
        className="shopify"
        rowKey="requestUuid"
        pagination={{
          defaultPageSize: 5
        }}
        scroll={{
          x: 'max-content'
        }}
        search={false}
        options={false}
        columns={[
          {
            title: 'Request Title',
            dataIndex: 'requestTitle'
          },
          {
            title: 'Request UUID',
            dataIndex: 'requestUuid'
          },
          {
            title: 'Contact UUID',
            dataIndex: 'contactUuid'
          },
          {
            title: 'Received at',
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
            fixed: 'right',
            render: (_, record) => {
              return (
                <TriggerModal
                  width={620}
                  title="Submission request details"
                  hasFooter={false}
                  trigger={<IconButton icon={ViewIcon} />}
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

export default ContactRequests;