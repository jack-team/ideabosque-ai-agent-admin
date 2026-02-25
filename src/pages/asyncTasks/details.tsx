import { type FC } from 'react';
import { Divider } from 'antd';
import { ProForm, ProCard } from '@ant-design/pro-components';
import LongTextReadonly from '@/components/LongTextReadonly';
import { useLang } from '@/hooks/useLang';

type DetailsProps = {
  onSuccess?: () => void;
  formData?: Record<string, any>;
}

const Details: FC<DetailsProps> = (props) => {
  const { formData } = props;
  const { t } = useLang();
  const [form] = ProForm.useForm();

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={formData}
    >
      <ProForm.Item
        label={t('thread.Function Name')}
        name="functionName"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label={t('common.status')}
        name="status"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item
        label={t('thread.Time Spent')}
        name="timeSpent"
      >
        <LongTextReadonly />
      </ProForm.Item>
      <Divider orientation="horizontal">
        {t('thread.Arguments')}
      </Divider>
      <ProCard style={{ marginBottom: 24 }}>
        <ProForm.Item
          label={t('agent.agentUuid')}
          name={["arguments", "agentUuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label={t('thread.Run UUID')}
          name={["arguments", "runUuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label={t('thread.Stream')}
          name={["arguments", "stream"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label={t('thread.Thread UUID')}
          name={["arguments", "threadUuid"]}
        >
          <LongTextReadonly />
        </ProForm.Item>
        <ProForm.Item
          label={t('thread.User Query')}
          name={["arguments", "userQuery"]}
        >
          <LongTextReadonly pre />
        </ProForm.Item>
      </ProCard>
      <ProForm.Item name="notes" label={t('thread.Notes')}>
        <LongTextReadonly />
      </ProForm.Item>
      <ProForm.Item name="result" label={t('thread.Result')}>
        <LongTextReadonly />
      </ProForm.Item>
    </ProForm>
  );
}

export default Details;