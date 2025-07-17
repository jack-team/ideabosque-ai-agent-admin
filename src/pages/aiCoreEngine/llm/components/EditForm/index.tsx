import { type FC } from 'react';
import { message, Card } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useListenModalOk } from '@/components/TriggerModal';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { insertUpdateLlmApi, queryLlmApi } from '@/services/llm';
import styles from './styles.module.less';

type EditFormProps = {
  insert?: boolean;
  formData?: Record<string, any>;
  onSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { insert = true, formData, onSuccess } = props;
  const [form] = ProForm.useForm();

  //添加提交
  const onSubmit = useMemoizedFn(async () => {
    const values = await form.validateFields();

    const { llmProvider, llmName } = values;

    const result = await queryLlmApi({
      llmProvider,
      llmName
    });

    if (result?.llm?.llm) {
      message.error('item already exist.');
      return Promise.reject();
    }

    try {
      const params = {
        ...values,
        updatedBy: 'admin',
      }
      await insertUpdateLlmApi(params);
      onSuccess?.();
      message.success(`${insert ? 'Created' : 'Updated'} successfully.`);
    } catch (err) {
      message.error(`${insert ? 'Creation' : 'Updated'} failed.`);
    }
  });

  useListenModalOk(onSubmit);

  return (
    <div className={styles.container}>
      <ProForm
        form={form}
        submitter={false}
        labelAlign="left"
        layout="horizontal"
        initialValues={formData}
        labelCol={{ flex: '160px' }}
      >
        <Card>
          <ProFormText
            name="llmProvider"
            label="Llm Provider"
            rules={[
              { required: true }
            ]}
          />
          <ProFormText
            label="Llm Name"
            name="llmName"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="className"
            label="Class Name"
            rules={[{ required: true }
            ]}
          />
          <ProFormText
            name="moduleName"
            label="Module Name"
            rules={[
              { required: true }
            ]}
          />
        </Card>
      </ProForm>
    </div>
  );
}

export default EditForm;