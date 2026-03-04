import type { FC } from 'react';
import { App } from 'antd';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { useLang } from '@/hooks/useLang';
import { PlatformsMap, Platforms } from './enum';
import { partId } from '@/env';

type EditFormProps = {
  record?: ThemeSettingDataType;
  onSuccess?: (result: ThemeSettingDataType) => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { record } = props;
  const { t } = useLang();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useModalOkClick(async () => {
    const fromData = await form.validateFields();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={record}
    >
      <ProFormText
        label="集成标题"
        name="themeTitle"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="集成平台"
        name="p"
        valueEnum={PlatformsMap}
        initialValue={Platforms.Web}
        rules={[{ required: true }]}
      />
      <ProFormTextArea
        label="集成描述"
        name="themeDescription"
        rules={[{ required: true }]}
      />
    </ProForm>
  );
}

export default EditForm;