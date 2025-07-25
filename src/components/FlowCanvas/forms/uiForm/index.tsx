import { type FC, Fragment } from 'react';
import { ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { useCanvasContext } from '../../hooks';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const UiForm: FC<FormProps> = () => {
  const { uiComponents = [] } = useCanvasContext();
  
  return (
    <Fragment>
      <ProFormSelect
        label="Component"
        name="component"
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
    </Fragment>
  );
}

export default UiForm;