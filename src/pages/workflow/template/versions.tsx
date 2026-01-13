import { type FC } from 'react';
import { App } from 'antd';
import { formatDate } from '@/utils';
import { useRequest } from 'ahooks';
import { StatusEnum } from '@/constants/enum';
import { useModalOkClick } from '@/components/TriggerModal';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { promptTemplateListApi, insertUpdatePromptTemplateApi } from '@/services/workflow';
import type { PromptTemplateDataType } from '@/typings/workflow';
import { partId } from '@/env';

type VersionsProps = {
  workflow: PromptTemplateDataType;
  onSaveSuccess?: () => void;
}

const Versions: FC<VersionsProps> = (props) => {
  const { workflow } = props;
  const { message } = App.useApp();
  const [form] = ProForm.useForm();

  const {
    data,
    loading
  } = useRequest(async () => {
    return promptTemplateListApi({
      promptUuid: workflow.promptUuid
    });
  })

  const options = data?.data?.map(item => {
    return {
      label: formatDate(item.createdAt),
      value: item.promptVersionUuid
    }
  });

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdatePromptTemplateApi({
        ...values,
        status: StatusEnum.Active,
        updatedBy: partId
      });
      props.onSaveSuccess?.();
      message.success(`Template version successfully applied.`);
    } catch (err) {
      message.error(`Failed to apply for the version, please contact the administrator.`);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={workflow}
    >
      <ProFormText
        hidden
        name="promptUuid"
      />
      <ProFormText
        hidden
        name="promptName"
      />
      <ProFormText
        hidden
        name="promptType"
      />
      <ProFormText
        hidden
        name="templateContext"
      />
      <ProFormSelect
        options={options}
        label="Current version"
        name="promptVersionUuid"
        fieldProps={{ loading }}
        rules={[{ required: true }]}
      />
    </ProForm>
  );
}

export default Versions;