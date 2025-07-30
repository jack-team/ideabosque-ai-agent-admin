import { type FC, Fragment } from 'react';
import {
  ProFormText,
  ProFormTextArea
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
        label="Text"
        name="text"
        rules={[
          { required: false }
        ]}
      />
    </Fragment>
  );
}

export default Form;