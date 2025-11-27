import { type FC, Fragment } from 'react';
import { Checkbox, Form } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ProFormText, ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { DataTypeMap, ValidateTypeMap } from '../../enum';
import { useElements } from '../../hooks'
import type { EditFormProps } from './fields';

const AddMenuForm: FC<EditFormProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();
  const { elementOptions, loading } = useElements();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
    closeModal();
  });

  const handleChange = useMemoizedFn(([val]) => {

    const element = elementOptions.find((e: any) => {
      return e.value === val;
    })?.realData;

    let values: Record<string, any> = {
      element_uuid: element?.elementUuid,
      element_title: element?.elementTitle || val
    }

    if (element) {
      values = {
        ...values,
        pattern: element.element,
        data_type: element.dataType,
        attribute_type: element.attributeType,
        option_values: element.optionValues || [],
      }
    }

    form.setFieldsValue(values);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
      style={{ padding: '16px 0 0 0' }}
    >
      <ProFormText name="element_uuid" hidden />
      <ProFormText name="element_title" hidden />
      <ProFormText name="option_values" hidden />
      {formData ? (
        <ProFormText
          name="element_title"
          label="Name"
          rules={[{ required: true }]}
          extra={!!formData ? (
            <div style={{ paddingTop: 6 }}>
              <strong>Warning:</strong> Changes made to menu items are global and affect all instances across the system.
              To avoid making global changes, make a new item from th Edit UI Block Group page.
            </div>
          ) : null}
        />
      ) : (
        <ProFormSelect
          name="tag_name"
          label="Name"
          mode="tags"
          showSearch
          onChange={handleChange}
          options={elementOptions}
          rules={[{ required: true }]}
          fieldProps={{ loading, maxCount: 1 }}
        />
      )}
      <ProFormDependency name={['element_uuid']}>
        {({ element_uuid }) => {
          const disabled = !formData && !!element_uuid;
          return (
            <Fragment>
              <ProFormText
                name="data_type"
                label="Data type"
                disabled={disabled}
                placeholder="Select data type"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                disabled={disabled}
                name="attribute_type"
                label="Attribute type"
                valueEnum={DataTypeMap}
                placeholder="Select attribute type"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                name="pattern"
                disabled={disabled}
                label="Validate type"
                valueEnum={ValidateTypeMap}
              />
            </Fragment>
          )
        }}
      </ProFormDependency>
      <Form.Item
        label="Required status"
        name="required"
        valuePropName="checked"
      >
        <Checkbox>Required</Checkbox>
      </Form.Item>
    </ProForm>
  );
}

export default AddMenuForm;