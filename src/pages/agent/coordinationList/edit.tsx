import { type FC, useMemo } from 'react';
import { App } from 'antd';
import { useRequest } from 'ahooks';

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
import { getThemeSettingListApi } from '@/services/themeSetting';
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

  const {
    loading: themesLoading,
    data: themes = coordinationDetail?.theme ?
      [coordinationDetail.theme] : []
  } = useRequest(async () => {
    const result = await getThemeSettingListApi({
      current: 1,
      pageSize: 1000 as any
    });
    return result.data;
  });

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
          fieldProps={{
            rows: 10
          }}
        />
        <ProFormSelect
          label="Connected theme"
          name="themeUuid"
          options={themes}
          fieldProps={{
            loading: themesLoading,
            fieldNames: {
              label: 'themeTitle',
              value: 'themeUuid'
            }
          }}
        />
        <ProFormSelect
          label="Connected agents"
          name="agentUuids"
          mode="multiple"
          allowClear={false}
          options={agents}
          fieldProps={{
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