import { type FC, Fragment, useMemo } from 'react';
import {
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-components';
import type { FormProps } from '../types';
import { useCanvasContext } from '../../hooks';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { actions = [] } = useCanvasContext();

  const options = useMemo(() => {
    return actions.map(item => ({
      value: item.name,
      label: item.description
    }));
  }, [actions]);

  return (
    <Fragment>
      <ProFormSelect
        label="Action"
        name="type"
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
    </Fragment>
  );
}

export default Form;