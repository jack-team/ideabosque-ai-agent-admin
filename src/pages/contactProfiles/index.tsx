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
          <Button className="shopify">
            Contact Requests
          </Button>
        </Space>
      }
    >

      <ProTable
        className="shopify"
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Contact UUID',
            dataIndex: 'a'
          },
          {
            title: 'First Name',
            dataIndex: 'b'
          },
          {
            title: 'Last Name',
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

export default ContactProfiles;