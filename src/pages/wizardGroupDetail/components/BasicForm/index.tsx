import { type FC, memo } from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';

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
      <ProFormText
        name="weight"
        label="Weight"
        initialValue={0}
        placeholder="Weight"
        rules={[
          { required: true }
        ]}
      />
    </>
  );
}

export default memo(BasicForm);