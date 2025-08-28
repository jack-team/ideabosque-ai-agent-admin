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

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { actions = [], transformTools } = useFlowContext();

  const options = useMemo(() => {
    return actions.map(item => ({
      value: item.name,
      label: item.description
    }));
  }, [actions]);

  const getTool = (type: string) => {
    return transformTools?.find(e => e.value === type);
  }

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
              <ProFormList
                name="transform"
                alwaysShowItemLabel
                className="custom_form_list"
                creatorButtonProps={{
                  creatorButtonText: 'Add Transform'
                }}
              >
                {(_, __, action) => {
                  return (
                    <>
                      <ProFormSelect
                        label="Type"
                        name="type"
                        options={transformTools}
                        rules={[
                          { required: true }
                        ]}
                        fieldProps={{
                          onChange(value) {
                            const tool = getTool(value as string);
                            action.setCurrentRowData({ 
                              attrs: [],
                              value: tool?.subValue,
                            });
                          },
                        }}
                      />
                      <ProFormText hidden name="value" />
                      <ProFormDependency name={["attrs"]}>
                        {({ attrs = [] }) => {
                          const rowData = action.getCurrentRowData();
                          const tool = getTool(rowData.type);
                          const maxAttrs = tool?.maxAttrs ?? 100;
                          const disabled = attrs.length >= maxAttrs;

                          return (
                            <ProFormList
                              name="attrs"
                              label="Attributes"
                              alwaysShowItemLabel
                              className="custom_form_list"
                              creatorButtonProps={{
                                disabled: disabled,
                                creatorButtonText: 'Add Attribute'
                              }}
                            >
                              <ProFormText
                                name="attr"
                                label="Attribute"
                                rules={[
                                  { required: true }
                                ]}
                              />
                            </ProFormList>
                          )
                        }}
                      </ProFormDependency>
                    </>
                  );
                }}
              </ProFormList>
            </Fragment>
          );
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default Form;