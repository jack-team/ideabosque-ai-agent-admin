import { type FC, Fragment } from 'react';

import {
  ProFormSelect,
  ProFormTextArea,
  ProFormDependency
} from '@ant-design/pro-components';
import InputPramsFormItems from '../../components/InputPramsFormItems';

import { useCanvasContext } from '../../hooks';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { uiComponents = [] } = useCanvasContext();

  return (
    <Fragment>
      <ProFormSelect
        label="Component"
        name="componentId"
        options={uiComponents}
        fieldProps={{
          fieldNames: {
            value: 'componentId',
            label: 'componentName'
          }
        }}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Description"
        name="description"
      />
      <ProFormDependency name={['componentId']}>
        {({ componentId }) => {
          const component = uiComponents.find(e => {
            return e.componentId === componentId;
          });
          return (
            <InputPramsFormItems
              inputParams={component?.input}
            />
          )
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default Form;