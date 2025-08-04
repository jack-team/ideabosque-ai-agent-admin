import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency
} from '@ant-design/pro-components';

import {
  useLlms,
  useMcpServers,
  useWorkflows,
  // useAgentVersions
} from '@/hooks/useFetchData';

import { ToolCallMap } from '@/constants/map';

type EditFromProps = {
  formData?: Record<string, any>;
}

const EditFrom: FC<EditFromProps> = () => {
  // const { formData } = props;
  const [form] = ProForm.useForm();

  const {
    options: flowOptions,
    loading: flowLoading
  } = useWorkflows();

  const {
    options: llmOptions,
    loading: llmLoading
  } = useLlms();

  const {
    options: mcpServerOptions,
    loading: mcpServerLoading
  } = useMcpServers();

  // useAgentVersions();

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{
        padding: '24px 0 0 0'
      }}
    >
      <ProFormText
        label="Agent Name"
        name="agentName"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Agent Description"
        name="agentDescription"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="LLM Provider"
        name="llmProvider"
        options={llmOptions}
        fieldProps={{
          loading: llmLoading,
          onChange: () => {
            form.resetFields(['llmName']);
          }
        }}
        rules={[
          { required: true }
        ]}
      />
      <ProFormDependency name={['llmProvider']}>
        {({ llmProvider }) => {
          if (!llmProvider) {
            return null;
          }
          const item = llmOptions?.find(item =>
            item.value === llmProvider
          );
          const llmName = item?.realData?.llmName;
          return (
            <ProFormSelect
              key={llmName}
              name="llmName"
              label="LLM Name"
              initialValue={llmName}
              disabled
              options={[
                {
                  label: llmName,
                  value: llmName
                }
              ]}
              rules={[
                { required: true }
              ]}
            />
          )
        }}
      </ProFormDependency>
      <ProFormSelect
        label="Flow snippet"
        name="flowSnippetVersionUuid"
        options={flowOptions}
        fieldProps={{
          loading: flowLoading
        }}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Num of Messages"
        name="numOfMessages"
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        label="Tool Call Role"
        name="toolCallRole"
        valueEnum={ToolCallMap}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label="Instructions"
        name="instructions"
      />
      <ProFormSelect
        label="MCP Servers"
        name="mcpServerUuids"
        mode="multiple"
        options={mcpServerOptions}
        fieldProps={{
          loading: mcpServerLoading
        }}
        rules={[
          { required: true }
        ]}
      />
    </ProForm>
  );
}

export default EditFrom;