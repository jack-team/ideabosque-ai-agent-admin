import type { FC } from 'react';
import { App } from 'antd';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateThemeSettingApi } from '@/services/themeSetting';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { useLang } from '@/hooks/useLang';
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
    try {
      const result = await insertUpdateThemeSettingApi({
        ...fromData,
        updatedBy: partId()
      });

      if (record) {
        message.success(t('common.Saved successfully'));
      }

      props.onSuccess?.(result.themeSetting);
      return true;
    } catch (err) {
      message.error('common.Failed to save, please contact the administrator');
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
        label={t('theme.Theme name')}
        name="themeTitle"
        rules={[{ required: true }]}
      />
      <ProFormTextArea
        label={t('theme.Theme description')}
        name="themeDescription"
        rules={[{ required: true }]}

      />
      <ProFormText
        hidden
        name="setting"
        initialValue={{}}
      />
    </ProForm>
  );
}

export default EditForm;