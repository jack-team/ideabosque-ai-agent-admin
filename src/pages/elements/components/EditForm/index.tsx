import { type FC, useEffect } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-components';
import { App, Row, Col } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData, formDataToParams } from './helper';
import { insertUpdateWizardApi } from '@/services/wizard';
import { useElementOptions } from '@/hooks/useFetchData';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();
  const elements = useElementOptions();

  const initFromData = useMemoizedFn(() => {
    form.setFieldsValue(recordToFormData(formData));
  });

  useEffect(() => {
    if (formData) {
      initFromData();
    }
  }, [formData]);

  useListenModalOk(async () => {
    const values = await form.validateFields();
    const params = formDataToParams(values);
    try {
      await insertUpdateWizardApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`Wizard ${formData ? 'updated' : 'created'} successfully.`);
    } catch (err) {
      message.success(`Failed to ${formData ? 'update' : 'create'} Wizard.`);
    }
  });

  return (
    <ProForm
      form={form}
      layout="horizontal"
      submitter={false}
      labelCol={{
        flex: '170px'
      }}
      labelAlign='left'
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="elementUuid"
      />
      <ProFormText
        label="Element Title"
        name="elementTitle"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Data Type"
        name="dataType"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Attribute Name"
        name="attributeName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Attribute Type"
        name="attributeType"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Priority"
        name="priority"
        rules={[
          { required: true }
        ]}
      />
      <ProFormList
        label="Option Values"
        name="optionValues"
        creatorButtonProps={{
          creatorButtonText: 'Add Option'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="Name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="value"
              label="Value"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true }
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
      <ProFormList
        label="Conditions"
        name="conditions"
        creatorButtonProps={{
          creatorButtonText: 'Add Condition'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="attribute"
              label="Attribute"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="value"
              label="Value"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true }
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
}

export default EditFrom;