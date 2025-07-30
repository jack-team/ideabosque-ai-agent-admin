import { type FC, Fragment } from 'react';
import {
  ProFormSelect,
  ProFormTextArea,
  ProFormDependency
} from '@ant-design/pro-components';
import InputPramsFormItems from '../../components/InputPramsFormItems';
import { useFlowContext } from '../../hooks';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { uiComponents = [] } = useFlowContext();

  const options = uiComponents.map(e => {
    return {
      label: e.componentName,
      value: e.componentId
    }
  });

  return (
    <Fragment>
      <ProFormSelect
        label="Component"
        name="componentId"
        options={options}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Text"
        name="text"
        rules={[
          { required: true }
        ]}
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