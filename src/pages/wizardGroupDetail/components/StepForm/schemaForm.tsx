import { type FC, useEffect, memo } from 'react';
import { Row, Col, type FormItemProps, Form } from 'antd';
import { ProFormText, ProFormSelect, ProFormItem } from '@ant-design/pro-components';
import UploadInput from '@/components/UploadInput';
import MenuItems from './menuItems';
import { FormFieldType } from '../../enum';
import type { AttributeType } from '../../types';

type SchemaFormProps = {
  name: string;
  schema: AttributeType[];
}

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { schema, name } = props;

  const renderItem = (item: AttributeType, schemaName: string[]) => {
    const required = item.required;
    const type = item.attribute_type;
    const formName = [...schemaName, 'value'];
    const rules: FormItemProps['rules'] = [];

    if (required) {
      rules.push({ required: true });
    }

    if (item.pattern) {
      rules.push({ pattern: new RegExp(item.pattern) });
    }

    const formProps: FormItemProps = {
      rules,
      required,
      name: formName,
      label: item.label,
      extra: item.extra
    };

    switch (type) {
      case FormFieldType.Text: {
        return <ProFormText {...formProps} />;
      }
      case FormFieldType.Select:
      case FormFieldType.MultiSelect: {
        const isSingle = type === FormFieldType.Select;
        return (
          <ProFormSelect
            {...formProps}
            options={item.options}
            mode={isSingle ? 'single' : 'multiple'}
          />
        );
      }
      case FormFieldType.Elements:
      case FormFieldType.CheckboxItems: {
        return (
          <Form.Item label={item.label} noStyle={!item.label}>
            <MenuItems name={formName} />
          </Form.Item>
        );
      }
      case FormFieldType.UploadImage: {
        return (
          <ProFormItem {...formProps}>
            <UploadInput namespace="confirmation_image" />
          </ProFormItem>
        );
      }
    }
  }

  return (
    <Row gutter={16}>
      {schema.map(item => {
        const col = +(item.col || 24);
        const schemaName = [name, item.name];
        const key = [item.group_name, item.name].join('.');
        return (
          <Col key={key} span={col}>
            {renderItem(item, schemaName)}
            <ProFormText
              hidden
              name={[...schemaName, 'type']}
              initialValue={item.attribute_type}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default memo(SchemaForm);