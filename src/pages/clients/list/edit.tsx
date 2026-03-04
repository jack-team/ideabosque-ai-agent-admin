import type { FC } from 'react';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { useModalOkClick } from '@/components/TriggerModal';
import type { ThemeSettingDataType } from '@/typings/themeSetting';
import { PlatformsMap, Platforms } from './enum';

type EditFormProps = {
  record?: ThemeSettingDataType;
  onSuccess?: (result: ThemeSettingDataType) => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { record } = props;
  const [form] = ProForm.useForm();

  useModalOkClick(async () => {
    
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={record}
    >
      <ProFormText
        label="标题"
        name="themeTitle"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="平台"
        name="p"
        valueEnum={PlatformsMap}
        initialValue={Platforms.Web}
        rules={[{ required: true }]}
      />
      <ProFormTextArea
        label="描述"
        name="themeDescription"
        rules={[{ required: true }]}
      />
    </ProForm>
  );
}

export default EditForm;