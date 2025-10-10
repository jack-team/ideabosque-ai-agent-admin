import { type FC } from 'react';
import { ProFormText, ProForm, ProFormCheckbox, ProFormSelect } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { DataTypeMap } from '../../enum';
import type { EditFormProps } from './fields';


const AddMenuForm: FC<EditFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
    closeModal();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
      style={{ padding: '16px 0 0 0' }}
    >
      <ProFormText
        name="title"
        label="Name"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        name="attrType"
        label="Attribute type"
        valueEnum={DataTypeMap}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        name="attrName"
        label="Attribute Name"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        name="dataType"
        label="Data type"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        name="priority"
        label="Priority"
        rules={[
          { required: true }
        ]}
      />
      <ProFormCheckbox.Group
        label="Required status"
        name="required"
        options={[
          { label: 'Required', value: true }
        ]}
      />
    </ProForm>
  );
}

export default AddMenuForm;