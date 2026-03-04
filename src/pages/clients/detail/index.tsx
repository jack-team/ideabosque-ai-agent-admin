import type { FC } from 'react';
import { Col, Row, Space } from 'antd';
import { ProForm, ProFormList, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import MoreMenu from './moreMenu';
import styles from './styles.module.less';

const ClientDetail: FC = () => {
  const [form] = ProForm.useForm();
  return (
    <PageContainer
      title="集成详情"
      fullScreen
      extra={
        <Space>
          <Button >复制集成代码</Button>
          <Button type="primary">保存</Button>
        </Space>
      }
    >
      <ProForm form={form} submitter={false}>
        <ProFormList
          name="pages"
          alwaysShowItemLabel
          initialValue={[{}]}
          actionRender={() => []}
          className={styles.form_list}
        >
          {(_, index, action) => {
            return (
              <div className={styles.form_item}>
                <div className={styles.actions}>
                  <MoreMenu index={index} action={action} />
                </div>
                <Row gutter={16}>
                  <Col span={24}>
                    <ProFormText
                      name="pagePath"
                      label="页面名称"
                      rules={[
                        { required: true }
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <ProFormText
                      name="pagePath"
                      label="页面路径"
                      extra="如果不填则所有页面生效"
                    />
                  </Col>
                  <Col span={24}>
                    <ProFormSelect
                      name="cond"
                      label="智能体协调"
                      rules={[
                        { required: true }
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <ProFormSelect
                      name="agent"
                      label="智能体"
                      rules={[
                        { required: true }
                      ]}
                    />
                  </Col>
                </Row>
              </div>
            )
          }}
        </ProFormList>
      </ProForm>
    </PageContainer>
  );
}

export default ClientDetail;