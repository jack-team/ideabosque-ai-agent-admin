import { type FC, memo } from 'react';
import { InputNumber } from 'antd';
import { ProFormText, ProFormTextArea, ProFormItem } from '@ant-design/pro-components';

const BasicForm: FC = () => {
  return (
    <>
      <ProFormText
        name="wizardGroupName"
        label="Block Group Name"
        placeholder="UI Block Group"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        name="wizardGroupDescription"
        label="Description"
        placeholder="This is the description of the UI Block Group"
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        disabled
        name="wizardGroupUuid"
        label="Block Group UUID"
        placeholder="Block Group UUID"
        rules={[
          { required: true }
        ]}
      />
      <ProFormItem
        name="weight"
        label="Weight"
        initialValue={0}
        rules={[
          { required: true }
        ]}
      >
        <InputNumber
          placeholder="Weight"
          style={{ width: '100%' }}
        />
      </ProFormItem>
    </>
  );
}

export default memo(BasicForm);