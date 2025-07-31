import { type FC, Fragment } from 'react';
import { Row, Col } from 'antd';
import {
  ProFormText,
  ProFormTextArea,
  ProFormList
} from '@ant-design/pro-components';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  return (
    <Fragment>
      <ProFormText
        label="Name"
        name="name"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Description"
        name="description"
        rules={[
          { required: false }
        ]}
      />
       <ProFormList
        label="Condition"
        name="branch"
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label="Label"
              name="label"
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="Value"
              name="value"
              rules={[
                { required: true }
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
    </Fragment>
  );
}

export default Form;