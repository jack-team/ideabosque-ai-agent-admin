import { type FC, Fragment } from 'react';
import { ProFormRadio, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { PromptTypesMap, PromptTypes } from './enum';
import type { FormProps } from '../types';

type Types = keyof typeof PromptTypesMap;

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  return (
    <Fragment>
      <ProFormRadio.Group
        label="Type"
        name="type"
        initialValue={PromptTypes.Prompt}
        valueEnum={PromptTypesMap}
        rules={[
          { required: true }
        ]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (!type) {
            return null;
          }

          return (
            <ProFormText
              label={PromptTypesMap[type as Types]}
              name="text"
              rules={[
                { required: true }
              ]}
            />
          )
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default Form;