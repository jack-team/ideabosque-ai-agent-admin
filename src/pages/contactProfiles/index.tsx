import type { FC } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getContactProfileListApi } from '@/services/contactProfiles';

const ContactProfiles: FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer
      className="shopify"
      title="Contact Profiles"
      extra={
        <Space>
          <Button
            className="shopify"
            onClick={() => navigate('/places')}
          >
            Places
          </Button>
          <Button
            className="shopify"
            onClick={() => navigate('/contact-requests')}
          >
            Contact Requests
          </Button>
        </Space>
      }
    >
      <ProTable
        className="shopify"
        search={false}
        options={false}
        rowKey="contactUuid"
        size="small"
        pagination={{
          defaultPageSize: 5
        }}
        request={async (params) => {
          const {
            contactProfileList: result
          } = await getContactProfileListApi({
            limit: params.pageSize,
            pageNumber: params.current,
          });
          return {
            data: result?.contactProfileList,
            total: result?.total
          }
        }}
        columns={[
          {
            title: 'Contact UUID',
            dataIndex: 'contactUuid'
          },
          {
            title: 'First Name',
            dataIndex: 'firstName'
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName'
          },
          {
            title: 'Email',
            dataIndex: 'email'
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
            align: 'center',
            title: 'Action',
            key: 'action',
            width: '100px',
            fixed: 'right',
            render: (_, record) => {
              return (
                <TriggerModal
                  width={600}
                  title="Contact Profile"
                  hasFooter={false}
                  trigger={
                    <Button
                      size="small"
                      className="shopify"
                    >
                      View
                    </Button>
                  }
                >
                  <EditFrom formData={record}/>
                </TriggerModal>
              );
            }
          }
        ]}
      />
    </PageContainer>
  );
}

export default ContactProfiles;