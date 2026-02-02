import type { FC } from 'react';
import { App } from 'antd';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateThemeSettingApi } from '@/services/themeSetting';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { partId } from '@/env';

type EditFormProps = {
  record?: ThemeSettingDataType;
  onSuccess?: (result: ThemeSettingDataType) => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { record } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useModalOkClick(async () => {
    const fromData = await form.validateFields();
    try {
      const result = await insertUpdateThemeSettingApi({
        ...fromData,
        updatedBy: partId
      });
      props.onSuccess?.(result);
      
      if (record) {
        message.success('The theme update was successful.');
      }
      return true;
    } catch (err) {
      message.success(record ? 'Updating theme failed.' : 'Failed to create new theme.');
      return false;
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={record}
    >
      <ProFormText
        hidden
        name="themeUuid"
      />
      <ProFormText
        hidden
        name="themeType"
        initialValue="chatbotTheme"
      />
      <ProFormText
        label="Theme name"
        rules={[{ required: true }]}
        name={["setting", "themeName"]}
      />
      <ProFormTextArea
        label="Theme description"
        rules={[{ required: true }]}
        name={["setting", "themeDescription"]}
      />
      <ProFormText
        hidden
        initialValue={{}}
        name={["setting", "themeJson"]}
      />
    </ProForm>
  );
}

export default EditForm;