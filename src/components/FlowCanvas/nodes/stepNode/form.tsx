import { type FC, Fragment, useRef } from 'react';
import * as uuid from 'uuid';
import { Row, Col } from 'antd';
import {
  ProFormText,
  ProFormTextArea,
  ProFormList,
  type FormListActionType
} from '@ant-design/pro-components';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const actionRef = useRef<FormListActionType>(undefined);
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
        actionRef={actionRef}
        actionGuard={{
          beforeAddRow: () => {
            const id = uuid.v4();
            actionRef.current?.add({ id });
            return false;
          }
        }}
      >
        <ProFormText name="id" />
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