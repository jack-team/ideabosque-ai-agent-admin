import type { FC } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency,
  ProFormList
} from '@ant-design/pro-components';
import { useWorkflows, useLlms } from '@/hooks/useFetchData';

const EditFrom: FC = () => {
  const [form] = ProForm.useForm();

  const {
    options: flowOptions,
    loading: flowLoading
  } = useWorkflows();

  const {
    options: llmOptions,
    loading: llmLoading
  } = useLlms();

  return (
    <ProForm
      form={form}
      submitter={false}
      layout="horizontal"
      style={{
        padding: '24px 0 0 0'
      }}
      labelAlign="left"
      labelCol={{ flex: '160px' }}
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
        name="description"
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
          if (!llmProvider) return null;
          const item = llmOptions?.find(item => {
            return item.value === llmProvider;
          });
          const llmName = item?.realData?.llmName;
          return (
            <ProFormSelect
              label="LLM Name"
              name="llmName"
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
        name="flowSnippet"
        options={flowOptions}
        fieldProps={{
          loading: flowLoading
        }}
        rules={[
          { required: true }
        ]}
      />
      <ProFormList
        required
        label="Num of Messages"
        name="messages"
        alwaysShowItemLabel
        creatorButtonProps={{
          creatorButtonText: 'Add text'
        }}
      >
        <ProFormText
          name="text"
          label={` `}
          colon={false}
          rules={[
            { required: true }
          ]}
        />
      </ProFormList>
    </ProForm>
  );
}

export default EditFrom;