import { type FC } from 'react';
import { App } from 'antd';
import { formatDate } from '@/utils';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import type { AgentDataType } from '@/typings/agent';
import { insertUpdateAgentApi } from '@/services/agent';
import { useModalOkClick } from '@/components/TriggerModal';
import { useAgentList } from '../hooks';

type VersionsProps = {
  agent: AgentDataType;
  onSaveSuccess?: () => void;
}

const Versions: FC<VersionsProps> = (props) => {
  const { agent } = props;
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  const {
    loading,
    data = [agent]
  } = useAgentList({ agentUuid: agent.agentUuid });

  const options = data.map(item => {
    return {
      label: formatDate(item.createdAt),
      value: item.agentVersionUuid
    }
  });


  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateAgentApi({ 
        ...values, 
        status: 'active',
        updatedBy: 'Admin' 
      });
      props.onSaveSuccess?.();
      message.success(`Application version successfully applied.`);
    } catch (err) {
      message.error(`Failed to apply for the version, please contact the administrator.`);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={agent}
    >
      <ProFormText
        hidden
        name="agentUuid"
      />
      <ProFormSelect
        options={options}
        label="Current version"
        name="agentVersionUuid"
        fieldProps={{ loading }}
        rules={[{ required: true }]}
      />
    </ProForm>
  );
}

export default Versions;