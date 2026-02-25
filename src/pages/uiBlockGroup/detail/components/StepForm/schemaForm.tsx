import { type FC, memo } from 'react';
import { Row, Col, type FormItemProps, Form } from 'antd';
import { ProFormText, ProFormSelect, ProFormItem } from '@ant-design/pro-components';
import UploadInput from '@/components/UploadInput';
import { useLang, useExists } from '@/hooks/useLang';
import MenuItems from './menuItems';
import { FormFieldType } from '../../enum';
import type { AttributeType } from '../../types';

type SchemaFormProps = {
  name: string;
  schema: AttributeType[];
}

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { schema, name } = props;
  const { t } = useLang();
  const [exists] = useExists();

  const renderItem = (item: AttributeType, schemaName: string[]) => {
    const required = item.required;
    const type = item.attributeType;
    const formName = [...schemaName, 'value'];
    const rules: FormItemProps['rules'] = [];
    const tkey = `uiBlockGroup.${item.label}`;

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
      extra: item.extra,
      label: exists(tkey) ? t(tkey) : item.label
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

  // 123
  return (
    <Row gutter={16}>
      {schema.map(item => {
        const col = +(item.col || 24);
        const schemaName = [name, item.name];
        const key = [item.groupName, item.name].join('.');
        return (
          <Col key={key} span={col}>
            {renderItem(item, schemaName)}
            <ProFormText
              hidden
              name={[...schemaName, 'type']}
              initialValue={item.attributeType}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default memo(SchemaForm);