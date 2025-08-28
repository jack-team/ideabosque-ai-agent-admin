import type { FC } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TriggerModal } from '@/components';
import { formatDate } from '@/utils';
import IconButton from '@/components/IconButton';
import { ViewIcon } from '@shopify/polaris-icons';
import EditFrom from './components/EditForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getContactProfileListApi } from '@/services/contactProfiles';

const ContactProfiles: FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer
      className="shopify"
      title="Contact Info"
      extra={
        <Space>
          <Button
            className="shopify gray"
            onClick={() => navigate('/places')}
          >
            Addresses
          </Button>
        </Space>
      }
    >
      <ProTable
        className="shopify"
        search={false}
        options={false}
        rowKey="contactUuid"
        scroll={{ x: 'max-content' }}
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
            width: '50px',
            fixed: 'right',
            render: (_, record) => {
              return (
                <TriggerModal
                  width={620}
                  title="Contact Info Details"
                  hasFooter={false}
                  trigger={<IconButton icon={ViewIcon} />}
                >
                  <EditFrom formData={record} />
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