import { type FC } from 'react';
import { Col, Row, App } from 'antd';
import {
  ProForm,
  ProFormList,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import type { UiComponentDataType } from '@/typings/ui';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateUiComponentApi } from '@/services/uiCpt';
import { ComponentTypeMap, ValueListFunctMap } from '@/constants/enum';
import { objectIteration } from '@/utils';
import { getPartId } from '@/env';

type EditFormProps = {
  formData?: UiComponentDataType;
  onSaveSuccess?: () => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const { t } = useLang();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useModalOkClick(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateUiComponentApi({
        ...values,
        updatedBy: getPartId(),
      });
      props.onSaveSuccess?.();
      message.success(t('common.Saved successfully'));
    } catch (err: any) {
      message.error(err.message);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={props.formData}
    >
      <ProFormText hidden name="uiComponentUuid" />
      <ProFormText
        label={t('workflow.tagName')}
        name="tagName"
        rules={[{ required: true }]}
      />
      <ProFormText
        label={t('workflow.tagAlias')}
        name="tagAlias"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="uiComponentType"
        label={t('workflow.componentType')}
        rules={[{ required: true }]}
        valueEnum={ComponentTypeMap}
      />
      <ProFormText
        name="waitFor"
        label={t('workflow.waitFor')}
        rules={[{ required: true }]}
      />
      <ProFormList
        label={t('workflow.parameters')}
        name="parameters"
        alwaysShowItemLabel
        className="custom-form-list"
        required
        rules={[
          {
            validator: (_, value = [], callback) => {
              if (!value.length) {
                callback(t('workflow.pleaseAddParameter'));
                return;
              }
              callback();
            },
          },
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="label"
              label={t('common.name')}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="name"
              label={t('workflow.parameter')}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="parameter"
              label={t('common.defaultValue')}
              rules={[{ required: false }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="valueListFunct"
              label={t('workflow.Get Data Function')}
              valueEnum={objectIteration(ValueListFunctMap, t)}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
}

export default EditForm;