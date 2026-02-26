import { type FC, Fragment } from 'react';
import { useLang } from '@/hooks/useLang';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { t } = useLang();

  return (
    <Fragment>
      <ProFormText
        label={t('flowCanvas.Step name')}
        name="name"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label={t('flowCanvas.description')}
        name="description"
        rules={[
          { required: false }
        ]}
      />
      <ProFormText name="branch" hidden />
    </Fragment>
  );
}

export default Form;