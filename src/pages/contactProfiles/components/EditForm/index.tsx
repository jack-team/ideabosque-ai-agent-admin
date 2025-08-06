import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData } from './helper';
import styles from './styles.module.less';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {

  });

  return (
    <ProForm
      disabled
      form={form}
      layout="horizontal"
      submitter={false}
      labelCol={{
        flex: '100px',
      }}
      labelAlign='left'
      initialValues={recordToFormData(formData)}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProFormText
            label="Email"
            name="email"
          />
        </Col>
        <Col span={24}>
          <ProFormText
            label="First Name"
            name="firstName"
          />
        </Col>
        <Col span={24}>
          <ProFormText
            label="Last Name"
            name="lastName"
          />
        </Col>
        <Col span={24} className={styles.readonly}>
          <ProFormTextArea
            label="Data"
            name="data"
            readonly
            fieldProps={{ rows: 8 }}
          />
        </Col>
        <Col span={24} className={styles.readonly}>
          <ProFormTextArea
            readonly
            label="Place"
            name="place"
            fieldProps={{ rows: 8 }}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;