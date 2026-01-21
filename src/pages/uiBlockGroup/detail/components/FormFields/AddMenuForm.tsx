import { type FC, Fragment } from 'react';
import { Checkbox, Form } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ProFormText, ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import { DataTypeMap, ValidateTypeMap, ValidateType } from '../../enum';
import { useElements } from '../../hooks'
import type { EditFormProps } from './fields';
import styles from './styles.module.less';

const AddMenuForm: FC<EditFormProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { elementOptions, loading } = useElements();

  useModalOkClick(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
  });

  const handleChange = useMemoizedFn(([val]) => {

    const element = elementOptions.find((e: any) => {
      return e.value === val;
    })?.realData;

    let values: Record<string, any> = {
      elementUuid: element?.elementUuid,
      elementTitle: element?.elementTitle || val
    }

    if (element) {
      values = {
        ...values,
        pattern: element.element,
        dataType: element.dataType,
        attributeType: element.attributeType,
        optionValues: element.optionValues || [],
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
      <ProFormText name="elementUuid" hidden />
      <ProFormText name="elementTitle" hidden />
      <ProFormText name="optionValues" hidden />
      {formData ? (
        <ProFormText
          name="elementTitle"
          label="Name"
          rules={[{ required: true }]}
          extra={!!formData ? (
            <div className={styles.name_tip}>
              <strong>Warning:</strong> Changes made to menu items are global and affect all instances across the system.
              To avoid making global changes, make a new item from th Edit UI Block Group page.
            </div>
          ) : null}
        />
      ) : (
        <ProFormSelect
          name="tagName"
          label="Name"
          mode="tags"
          showSearch
          onChange={handleChange}
          options={elementOptions}
          rules={[{ required: true }]}
          fieldProps={{ loading, maxCount: 1 }}
        />
      )}
      <ProFormDependency name={['elementUuid']}>
        {({ elementUuid }) => {
          const disabled = !formData && !!elementUuid;
          return (
            <Fragment>
              <ProFormText
                name="dataType"
                label="Data type"
                disabled={disabled}
                placeholder="Select data type"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                disabled={disabled}
                name="attributeType"
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
                initialValue={ValidateType.None}
                tooltip="Defines the required format for the data entered"
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