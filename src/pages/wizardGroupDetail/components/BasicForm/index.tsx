import { type FC } from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';

const BasicForm: FC = () => {
  return (
    <>
      <ProFormText
        name="wizardGroupName"
        label="Block Group Name"
        placeholder="UI Block Group"
      />
      <ProFormTextArea
        name="wizardGroupDescription"
        label="Block Group Name"
        placeholder="This is the description of the UI Block Group"
      />
      <ProFormText
        disabled
        name="wizardGroupUuid"
        label="Block Group UUID"
        placeholder="Block Group UUID"
      />
      <ProFormText
        name="weight"
        label="Weight"
        initialValue={0}
        placeholder="Weight"
      />
    </>
  );
}

export default BasicForm;