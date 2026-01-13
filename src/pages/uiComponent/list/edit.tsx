import { type FC } from 'react';
import { Col, Row, App } from 'antd';
import {
  ProForm,
  ProFormList,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import type { UiComponentDataType } from '@/typings/ui';
import {  useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateUiComponentApi } from '@/services/uiCpt';
import { ComponentTypeMap } from './enmu';
import { partId } from '@/env';

type EditFormProps = {
  formData?: UiComponentDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useModalOkClick(async () => {
     const values = await form.validateFields();
    try {
      await insertUpdateUiComponentApi({
        ...values,
        updatedBy: partId,
      });

      props.onSaveSuccess?.();
      message.success(`Successfully ${formData ? "updated" : "created"} UI component.`);
    } catch (err: any) {
      message.error(err.message);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
    >
      <ProFormText hidden name="uiComponentUuid" />
      <ProFormText
        label="Tag name"
        name="tagName"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="uiComponentType"
        label="Component type"
        rules={[{ required: true }]}
        valueEnum={ComponentTypeMap}
      />
      <ProFormText
        name="waitFor"
        label="Wait for"
        rules={[{ required: true }]}
      />
      <ProFormList
        label="Parameters"
        name="parameters"
        alwaysShowItemLabel
        className="custom-form-list"
        required
        rules={[
          {
            validator: (_, value = [], callback) => {
              if (!value.length) {
                callback("Please add parameter");
                return;
              }
              callback();
            },
          },
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="Name"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="parameter"
              label="Parameter"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
}

export default EditForm;