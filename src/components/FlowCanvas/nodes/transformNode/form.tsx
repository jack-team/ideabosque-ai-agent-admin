import { type FC, Fragment } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {
  ProFormSelect,
  ProFormList,
  ProFormText
} from '@ant-design/pro-components';
import { useCanvasContext } from '../../hooks';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { transformTools = [] } = useCanvasContext();
  return (
    <Fragment>
      <ProFormSelect
        options={transformTools}
        label="Type"
        name="type"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Text"
        name="text"
        rules={[
          { required: true }
        ]}
      />
      <ProFormList
        name="attrs"
        label="Attributes"
        creatorButtonProps={{
          creatorButtonText: 'Add Attribute'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label="From"
              name="from"
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="To"
              name="to"
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