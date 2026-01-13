import { type FC } from 'react';
import { App } from 'antd';

import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-components';

import SpinBox from '@/components/SpinBox';
import { StatusEnum } from '@/constants/enum';
import { useModalOkClick } from '@/components/TriggerModal';
import type { CoordinationDataType } from '@/typings/agent';
import { insertUpdateCoordinationApi } from '@/services/agent';
import { useAgentList, useCoordinationDetail } from '../hooks'
import { coordinationTransformFormData, formDataTransfromParams } from './helper';

type EditFormProps = {
  coordination?: CoordinationDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { coordination } = props;
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  const {
    loading,
    data: coordinationDetail
  } = useCoordinationDetail(coordination, (res) => {
    form.setFieldsValue(coordinationTransformFormData(res));
  });

  const {
    loading: fetchLoading,
    data: agents = coordinationDetail?.agents,
  } = useAgentList({ statuses: [StatusEnum.Active] });

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      const params = formDataTransfromParams(values, agents);
      await insertUpdateCoordinationApi(params);
      props.onSaveSuccess?.();
      message.success(`Saved successfully.`);
    } catch (err) {
      message.error(`Failed to save, please contact the administrator.`);
      return Promise.reject(err);
    }
  });

  return (
    <SpinBox loading={loading}>
      <ProForm
        form={form}
        submitter={false}
      >
        <ProFormText
          hidden
          name="coordinationUuid"
        />
        <ProFormText
          label="Coordination Name"
          name="coordinationName"
          rules={[{ required: true }]}
        />
        <ProFormTextArea
          label="Coordination Description"
          name="coordinationDescription"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          label="Connected agents"
          name="agentUuids"
          mode="multiple"
          options={agents}
          fieldProps={{
            maxTagCount: 2,
            loading: fetchLoading,
            fieldNames: {
              label: 'agentName',
              value: 'agentUuid'
            }
          }}
        />
      </ProForm>
    </SpinBox>
  );
}

export default EditForm;