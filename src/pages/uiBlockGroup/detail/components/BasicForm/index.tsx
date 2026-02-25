import { type FC, memo } from 'react';
import { InputNumber } from 'antd';
import { ProFormText, ProFormTextArea, ProFormItem } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';

const BasicForm: FC = () => {
  const { t } = useLang();
  return (
    <>
      <ProFormText
        name="wizardGroupName"
        label={t('uiBlockGroup.Block Group Name')}
        placeholder={t('uiBlockGroup.This is the name of the UI Block Group')}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        name="wizardGroupDescription"
        label={t('uiBlockGroup.Block Group Description')}
        placeholder={t('uiBlockGroup.This is the description of the UI Block Group')}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        disabled
        name="wizardGroupUuid"
        label={t('uiBlockGroup.UI Block Group UUID')}
        placeholder={t('uiBlockGroup.UI Block Group UUID')}
        rules={[
          { required: true }
        ]}
      />
      <ProFormItem
        name="weight"
        label={t('uiBlockGroup.Weight')}
        initialValue={0}
        rules={[
          { required: true }
        ]}
      >
        <InputNumber
          placeholder={t('uiBlockGroup.Weight')}
          style={{ width: '100%' }}
        />
      </ProFormItem>
    </>
  );
}

export default memo(BasicForm);