import { type FC, Fragment, useMemo } from 'react';
import { Divider } from 'antd';
import {
  ProFormSelect,
  ProFormTextArea,
  ProFormList,
  ProFormText,
  ProFormDependency
} from '@ant-design/pro-components';
import type { FormProps } from '../types';
import { useFlowContext } from '../../hooks';

const transformValueName = ['transform', 'value'];

// 该组建可以提供给外部使用
const Form: FC<FormProps> = (props) => {
  const { form } = props;
  const { actions = [], transformTools } = useFlowContext();

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
          { required: false }
        ]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (!type) return null;
          return (
            <Fragment >
              <Divider>Transform</Divider>
              <ProFormSelect
                label="Type"
                name={['transform', 'type']}
                options={transformTools}
                rules={[
                  { required: false }
                ]}
                fieldProps={{
                  onChange(value) {
                    const item = transformTools?.find(e => e.value === value);
                    form?.setFieldValue(transformValueName, item?.subValue)
                  },
                }}
              />
              <ProFormText
                hidden
                name={transformValueName}
              />
              <ProFormList
                name="attrs"
                label="Attributes"
                creatorButtonProps={{
                  creatorButtonText: 'Add Attribute'
                }}
              >
                <ProFormText
                  name="attr"
                  width="md"
                  rules={[
                    { required: false }
                  ]}
                />
              </ProFormList>
            </Fragment>
          );
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default Form;