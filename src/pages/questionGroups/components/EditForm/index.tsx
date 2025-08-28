import { type FC, useEffect } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormList
} from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { App, Row, Col } from 'antd';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { recordToFormData, formDataToParams } from './helper';
import { insertUpdateQuestionGroupApi } from '@/services/question';
import { RegionMap } from '@/constants/map';

type EditFromProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const [closeModal] = useModalClose();

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
      await insertUpdateQuestionGroupApi(params);
      closeModal();
      props.onSuccess?.();
      message.success(`Question Group ${formData ? 'updated' : 'created'} successfully.`);
    } catch (err) {
      message.error(`Failed to ${formData ? 'updated' : 'created'} Question Group.`);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        hidden
        name="questionGroupUuid"
      />
      <ProFormText
        label="Question Group Name"
        name="questionGroupName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Question Group Description"
        name="questionGroupDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Weight"
        name="weight"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="Region"
        name="region"
        valueEnum={RegionMap}
        rules={[
          { required: true }
        ]}
      />
      <ProFormList
        label="Question Criteria"
        name="questionCriteria"
        className="custom_form_list"
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label="Attribute"
              name="attribute"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="Value"
              name="value"
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