import { type FC } from 'react';
import { Row, Col } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = (props) => {
  const { formData } = props;
  const { t } = useLang();

  return (
    <ProForm
      disabled
      submitter={false}
      initialValues={formData}
    >
      <Row gutter={24}>
        <Col span={24}>
          <ProFormText
            label={t('thread.Sender')}
            name={["message", "role"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label={t('thread.Prompt tokens')}
            name={["message", "run", "promptTokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label={t('thread.Completion tokens')}
            name={["message", "run", "completionTokens"]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label={t('thread.Total tokens')}
            name={["message", "run", "totalTokens"]}
          />
        </Col>
      </Row>
    </ProForm>
  );
}

export default EditFrom;