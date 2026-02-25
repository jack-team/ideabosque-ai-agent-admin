import { type FC } from 'react';
import { Row, Col } from 'antd';
import { useLang } from '@/hooks/useLang';
import { ProFormText, ProForm } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { EditFormProps } from './fields';

const AddOptionForm: FC<EditFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const { t } = useLang();

  useModalOkClick(async () => {
    const formData = await form.validateFields();
    props.onSubmit?.(formData);
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
      style={{ padding: '16px 0 0 0' }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProFormText
            name="name"
            label={t('common.name')}
            rules={[
              { required: true }
            ]}
          />
        </Col>
        <Col span={24}>
          <ProFormText
            name="value"
            label={t('common.value')}
            rules={[
              { required: true }
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default AddOptionForm;