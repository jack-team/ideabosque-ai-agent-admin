import type { FC } from 'react';
import { Row, Col } from 'antd';
import { ProForm, ProFormText, ProFormList } from '@ant-design/pro-components';
import styles from './styles.module.less';

const AIMarketing: FC = () => {
  return (
    <div className={styles.container}>
      <ProForm
        submitter={false}
        layout="horizontal"
        className={styles.form}
      >
        <ProFormText
          label="Setting ID"
          name="settingId"
          rules={[
            { required: true }
          ]}
        />

        <ProFormList
          name="variables"
          creatorButtonProps={false}
          actionRender={() => []}
          initialValue={[
            { variable: "target" }
          ]}
        >
          <Row>
            <Col span={12}>
              <ProFormText
                readonly
                name="variable"
                label="Variable"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="value"
                label="Value"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              />
            </Col>
          </Row>
        </ProFormList>
      </ProForm>
    </div>
  );
}

export default AIMarketing;