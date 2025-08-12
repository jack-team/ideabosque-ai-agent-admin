import { type FC, Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormList,
  type ProFormItemProps
} from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { FormItemType, ConfigurationProps } from './types';
import { transfromSchema, validateNumber } from './helper';
import styles from './styles.module.less';

type SchemaFormProps = ConfigurationProps;

const defaultCol = 2;

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { schema, value } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();
  const items = transfromSchema(schema);

  const renderItem = (
    item: FormItemType,
    parent: string[] = [],
    _items: FormItemType[],
    _index: number
  ) => {
    const items = item.items || [];
    const options = item.options || [];
    const children = item.children || [];
    const names = parent.concat(item.name).filter(v => v);

    const itemProps: ProFormItemProps = {
      name: names,
      label: item.label,
      tooltip: item.tip,
      rules: [{ required: item.required }]
    }

    const key = names.join('');

    if (items.length) {
      return (
        <Col span={24} key={key}>
          <ProForm.Item>
            <Card
              title={item.label}
              className="shopify"
            >
              <ProFormList
                name={item.name}
                alwaysShowItemLabel
                creatorButtonProps={{
                  creatorButtonText: 'Add item'
                }}
                actionRender={() => []}
                required={item.required}
                rules={[{
                  validator(_, value, callback) {
                    if (item.required && !value.length) {
                      callback('Please add item');
                      return;
                    }
                    callback();
                  },
                }]}
              >
                {(_, index, action) => {
                  return (
                    <Fragment>
                      <div
                        className={styles.del_btn}
                        onClick={() => action.remove(index)}
                      >
                        <CloseOutlined />
                      </div>
                      <Row gutter={16}>
                        {items.map((e, i) => {
                          return renderItem(e, [], items, i);
                        })}
                      </Row>
                    </Fragment>
                  )
                }}
              </ProFormList>
            </Card>
          </ProForm.Item>
        </Col>
      );
    }

    if (children.length) {
      return (
        <Col key={key} span={24}>
          <Card
            title={item.label}
            className="shopify"
            style={{ marginBottom: 24 }}
          >
            <Row gutter={16}>
              {children.map((e, i) => {
                return renderItem(e, names, children, i);
              })}
            </Row>
          </Card>
        </Col>
      );
    }

    let colNum = defaultCol;
    const preItem = _items[_index - 1];

    // 最近的 formList 的下标
    const cursor = _items.findIndex((e, i) => {
      return (e.children || e.items) && i > _index;
    });

    if (cursor > -1) {
      const count = cursor;
      if (count % defaultCol !== 0) {
        if (_index === cursor - 1) {
          colNum = 1;
        }
      }
    } else {
      if (_items.length <= 1) {
        colNum = 1;
      } else {
        if (preItem?.children || preItem?.items) {
          colNum = 1;
        }
      }
    }

    if (options.length) {
      return (
        <Col key={key} span={24 / colNum}>
          <ProFormSelect
            {...itemProps}
            options={options}
          />
        </Col>
      );
    }

    return (
      <Col key={key} span={24 / colNum}>
        <ProFormText
          {...itemProps}
          rules={[
            {
              validator(_, value, callback) {
                if (item.required && !value) {
                  callback('Please enter');
                  return;
                }

                if (item.type === 'integer') {
                  const result = validateNumber(value, {
                    min: item.minimum,
                    max: item.maximum
                  });
                  if (!result.success) {
                    callback(result.message);
                    return;
                  }
                }
                callback();
              },
            }
          ]}
        />
      </Col>
    );
  }

  useListenModalOk(async () => {
    const values = await form.validateFields();
    props.onChange?.(values);
    closeModal();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={value}
      className={styles.schema_form}
    >
      <Row gutter={16}>
        {items.map((item, i) => renderItem(item, [], items, i))}
      </Row>
    </ProForm>
  );
}

export default SchemaForm;