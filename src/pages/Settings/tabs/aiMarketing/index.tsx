import { type FC } from 'react';
import { Row, Col, App } from 'antd';
import SpinBox from '@/components/SpinBox';
import { ShopifyButton } from '@/components';
import { useRequest, useUpdateEffect, useMemoizedFn } from 'ahooks';
import { ProForm, ProFormText, ProFormList } from '@ant-design/pro-components';
import { getConfigSettingListApi, insertUpdateConfigSettingApi } from '@/services/settings';
import { toFormDataValues, toSettingsData } from './helper';
import styles from './styles.module.less';

const config = {
  shop: 'quickstart-91577e17.myshopify.com',
  settingId: 'ai_marketing_engine_quickstart-91577e17'
}

const AIMarketing: FC = () => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  const { data, loading } = useRequest(async () => {
    const result = await getConfigSettingListApi(config);
    return result?.configSettingList?.configSettingList[0];
  });

  useUpdateEffect(() => {
    if (data) {
      form.setFieldsValue(toFormDataValues(data));
    }
  }, [data]);

  const onSubmit = useMemoizedFn(async () => {
    const values = await form.validateFields();
    try {
      await insertUpdateConfigSettingApi({
        ...config,
        settings: toSettingsData(values.settings)
      });
      message.success('Saved successfully');
    } catch (err) {
      message.error('Save failed');
    }
  });

  return (
    <SpinBox loading={loading}>
      <div className={styles.container}>
        <ProForm
          form={form}
          submitter={false}
          layout="horizontal"
          className={styles.form}
        >
          <ProFormText
            label="Setting ID"
            name="settingId"
            labelCol={{ flex: '180px' }}
            labelAlign="left"
            disabled
            rules={[
              { required: true }
            ]}
          />
          <ProFormList
            name="settings"
            actionRender={() => []}
            creatorButtonProps={false}
            className={styles.form_list}
          >
            <Row>
              <Col flex="180px">
                <ProFormText
                  readonly
                  name="variable"
                  label="Variable"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                />
              </Col>
              <Col flex={1}>
                <ProFormText
                  name="value"
                  label="Value"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                />
              </Col>
            </Row>
          </ProFormList>
          <div className={styles.submitter}>
            <ShopifyButton
              type="primary"
              onClick={onSubmit}
            >
              Save
            </ShopifyButton>
          </div>
        </ProForm>
      </div>
    </SpinBox>
  );
}

export default AIMarketing;