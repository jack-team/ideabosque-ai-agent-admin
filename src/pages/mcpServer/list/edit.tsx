import { type FC, useMemo } from 'react';
import { Col, Row, App } from 'antd';
import {
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import type { McpServerDataType } from '@/typings/mcp';
import { useModalOkClick } from '@/components/TriggerModal';
import { insertUpdateMcpServerApi } from '@/services/mcp';
import { partId } from '@/env';

type EditFormProps = {
  formData?: McpServerDataType;
  onSaveSuccess?: () => void;
}

type OptionType = {
  key: string;
  value: string;
}

type FormDataType = {
  headers: OptionType[];
  [key: string]: any;
}

const objToOptions = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((list, key) => {
    return [...list, { key, value: obj[key] }];
  }, [] as OptionType[]);
}

const optionsToObject = (options: OptionType[]) => {
  return options.reduce((obj, option) => {
    return { ...obj, [option.key]: option.value };
  }, {});
}


const EditForm: FC<EditFormProps> = (props) => {
  const { formData } = props;
  const [form] = ProForm.useForm<FormDataType>();
  const { message } = App.useApp();

  const initValues = useMemo(() => {
    if (!formData) return;
    const { headers, ...rest } = formData;
    return { ...rest, headers: objToOptions(headers) };
  }, [formData]);

  useModalOkClick(async () => {
    const values = await form.validateFields();
    const { headers, ...reset } = values;

    try {
      await insertUpdateMcpServerApi({
        ...reset,
        headers: optionsToObject(headers),
        updatedBy: partId,
      });
      props.onSaveSuccess?.();
      message.success(`Successfully ${formData ? "updated" : "created"} Mcp server.`);
    } catch (err: any) {
      message.error(err.message);
      return Promise.reject(err);
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      initialValues={initValues}
    >
      <ProFormText hidden name="mcpServerUuid" />
      <ProFormText
        label="Mcp label"
        name="mcpLabel"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="mcpServerUrl"
        label="Mcp server url"
        rules={[{ required: true, type: "url" }]}
      />
      <ProFormList
        required
        label="Headers"
        name="headers"
        alwaysShowItemLabel
        className="custom-form-list"
        creatorButtonProps={{
          creatorButtonText: "Add Header"
        }}
        rules={[
          {
            validator: (_, value = [], callback) => {
              if (!value.length) {
                callback("Please add Header");
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
              required
              label="Key"
              name="key"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              required
              label="Value"
              name="value"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProFormList>
    </ProForm>
  );
}

export default EditForm;