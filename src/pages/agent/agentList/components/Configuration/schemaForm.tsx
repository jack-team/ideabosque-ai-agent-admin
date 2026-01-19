import { type FC } from 'react';
import humps from 'humps';
import { Row, Col, InputNumber } from 'antd';
import {
  ProForm,
  ProCard,
  ProFormItem,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { SchemaFormProps, SchemaOptions } from './types';
import type { SchemaType } from '@/typings/llm';
import FormList from './formList';
import { getValByPaths } from './helper';
import styles from './styles.module.less';

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { schema: fromSchema, formData } = props;
  const [form] = ProForm.useForm();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    console.log(values);
    return;
    props.onSubmit?.(values);
  });

  const renderSchema = (schema: SchemaType, options?: SchemaOptions) => {
    let index = options?.index || 0;
    const floor = options?.floor || 0;
    const parentKey = options?.parentKey;
    const fullName = options?.fullName || [];
    const required = options?.required?.map(humps.camelize) || [];

    const formItemProps = {
      label: parentKey,
      name: fullName,
      initialValue: schema.default,
      tooltip: schema.description,
      rules: [{ required: options?.isRequired }]
    }

    switch (schema.type) {
      case 'object': {
        const properties = schema.properties;

        // 如果有属性往下查找
        if (properties) {
          const fields = Object.keys(properties);

          const renderField = (key: string, i: number) => {
            let span = 12;
            index += 1;
            const item = properties[key];
            const nextKey = fields[i + 1];
            const nextItem = properties[nextKey];
            const blockKeys = ['array', 'object'];

            // 检查是否为最后一个或者最近刚的一个是否为 block
            if (
              !nextItem ||
              nextItem?.$ref ||
              blockKeys.includes(nextItem?.type)
            ) {
              span = index % 2 ? 24 : 12;
            }

            // 检查当前节点是否为 block
            if (blockKeys.includes(item.type) || item.$ref) {
              span = 24;
              index = 0;
            }

            const isRequired = required.includes(key);

            return (
              <Col key={key} span={span}>
                {renderSchema(item, {
                  index,
                  isRequired,
                  parentKey: key,
                  floor: floor + 1,
                  required: item.required,
                  fullName: [...fullName, key]
                })}
              </Col>
            );
          }

          const content = (
            <Row gutter={16}>
              {fields.map(renderField)}
            </Row>
          );

          return floor ? (
            <ProFormItem
              label={parentKey}
              tooltip={schema.description}
            >
              <ProCard>{content}</ProCard>
            </ProFormItem>
          ) : content;

        } else {
          const { rules, ...restProps } = formItemProps;
          return (
            <FormList {...restProps}>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    label="Value"
                    name="value"
                    rules={[{ required: true }]}
                  />
                </Col>
              </Row>
            </FormList>
          );
        }
      }
      case 'string': {
        if (schema.enum) {
          return (
            <ProFormSelect
              {...formItemProps}
              options={schema.enum}
            />
          );
        }
        return <ProFormText {...formItemProps} />;
      }
      case 'array': {
        const s = schema.items;
        const { rules, ...restProps } = formItemProps;
        return s && (
          <FormList {...restProps}>
            {renderSchema(s, { required: s.required, isRequired: true })}
          </FormList>
        );
      }
      case 'number':
      case 'integer': {
        return (
          <ProFormItem {...formItemProps}>
            <InputNumber
              min={schema.minimum}
              max={schema.maximum}
              style={{ width: '100%' }}
              placeholder="Please enter"
            />
          </ProFormItem>
        );
      }
      default: {
        if (schema.$ref) {
          const [, ...paths] = schema.$ref.split('/');
          const s = getValByPaths(fromSchema, paths);
          return renderSchema(s, {
            floor: 1,
            parentKey,
            fullName,
            required: s.required
          });
        }

        if (schema.const) {
          const paths = ['definitions', 'paramSchema'];
          const s = getValByPaths(fromSchema, paths);
          if (s?.properties?.type) {
            return renderSchema({
              type: 'object',
              properties: {
                type: s.properties.type
              }
            }, {
              floor: 0,
              parentKey,
              fullName,
              required: s.required
            });
          }
        }
      }
    }
  }

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
      className={styles.schema_form}
    >
      {renderSchema(fromSchema, { required: fromSchema.required })}
    </ProForm>
  );
}

export default SchemaForm;