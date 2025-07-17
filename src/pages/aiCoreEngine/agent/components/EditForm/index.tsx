import { type FC, useMemo } from 'react';
import { message, Card } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useListenModalOk } from '@/components/TriggerModal';
import { insertUpdateAgentApi } from '@/services/agent';
import {
  ProForm,
  ProFormTextArea,
  ProFormSelect,
  ProFormSwitch
} from '@ant-design/pro-components';
import Versions from './versions';

import { parseJson } from '@/utils';
import { stringify } from './helper';
import { useFetchLlmOptions } from './hooks';
import styles from './styles.module.less';

type EditFormProps = {
  insert?: boolean;
  formData?: Record<string, any>;
  onSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { insert = true, formData, onSuccess } = props;
  const [form] = ProForm.useForm();
  const [options, loading] = useFetchLlmOptions();

  const formDataValues = useMemo(() => {
    if (!formData) return;

    let llm = formData.llm;
    let functions = formData.functions;
    let configuration = formData.configuration;
    let functionConfiguration = formData.functionConfiguration;

    if (llm) {
      llm = stringify({
        llmName: llm.llm_name,
        llmProvider: llm.llm_provider
      });
    }

    if (functions) {
      functions = stringify(functions);
    }

    if (configuration) {
      configuration = stringify(configuration);
    }

    if (functionConfiguration) {
      functionConfiguration = stringify(functionConfiguration);
    }

    return {
      ...formData,
      llm,
      functions,
      configuration,
      functionConfiguration,
      status: formData.status === 'active'
    }
  }, [formData]);

  //添加提交
  const onSubmit = useMemoizedFn(async () => {
    const values = await form.validateFields();
    let {
      llm,
      status,
      functions,
      configuration,
      functionConfiguration,
      ...rest
    } = values;

    if (llm) {
      llm = parseJson(llm);
    }

    if (functions) {
      functions = parseJson(functions);
    }

    if (configuration) {
      configuration = parseJson(configuration);
    }

    if (functionConfiguration) {
      functionConfiguration = parseJson(functionConfiguration)
    }

    try {
      const params = {
        ...rest,
        ...llm,
        functions,
        configuration,
        status: status? 'active': 'inactive',
        functionConfiguration,
        updatedBy: 'admin',
      }
      await insertUpdateAgentApi(params);
      onSuccess?.();
      message.success(`${insert ? 'Created' : 'Updated'} successfully.`);
    } catch (err) {
      message.error(`${insert ? 'Creation' : 'Updated'} failed.`);
      return Promise.reject(err);
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
        initialValues={formDataValues}
        labelCol={{ flex: '160px' }}
      >
        <Card className="shopify">
          <ProFormSelect
            label="Llm"
            name="llm"
            options={options}
            fieldProps={{ loading }}
            rules={[
              { required: true }
            ]}
          />
          {!insert && (
            <ProFormSelect
              readonly
              name="agentUuid"
              label="Agent Uuid"
              rules={[{ required: true }]}
            />
          )}
          <ProFormTextArea
            label="Agent Name"
            name="agentName"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            label='Instructions'
            name="instructions"
            fieldProps={{ cols: 6 }}
            rules={[{ required: true }]}
          />
          <ProFormSwitch
            label="Status"
            name="status"
          />
        </Card>
        <Card title="Configuration" className="shopify">
          <ProFormTextArea name="configuration" />
        </Card>
        <Card title="Function Configuration" className="shopify">
          <ProFormTextArea name="functionConfiguration" />
        </Card>
        <Card title="Functions" className="shopify">
          <ProFormTextArea name="functions" />
        </Card>
        {!insert && (
          <Card title="Versions" className="shopify">
            <Versions agentUuid={formData?.agentUuid} />
          </Card>
        )}
      </ProForm>
    </div>
  );
}

export default EditForm;