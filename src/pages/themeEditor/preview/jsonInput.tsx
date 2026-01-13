import type { FC } from 'react';
import { App } from 'antd';
import { ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { useModalOkClick, useModalClose } from '@/components/TriggerModal/hooks';
import { parseJson } from '@/utils';
import styles from './styles.module.less';

type JsonInputProps = {
  onSave?: (data: Record<string, any>) => void;
}

const JsonInput: FC<JsonInputProps> = (props) => {
  const { onSave } = props;
  const { message } = App.useApp();
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useModalOkClick(async () => {
    const val = form.getFieldValue('json');
    const json = parseJson(val);
    if (json) {
      onSave?.(json);
      closeModal();
    } else {
      message.error('The input JSON format is incorrect.');
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      className={styles.json_input}
    >
      <ProFormTextArea
        name="json"
        fieldProps={{
          rows: 20
        }}
      />
    </ProForm>
  );
}

export default JsonInput;