import { type FC, Fragment } from 'react';
import { ProFormRadio, ProFormDependency, ProFormTextArea } from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { objectIteration } from '@/utils'
import { PromptTypesMap, PromptTypes } from './enum';
import type { FormProps } from '../types';

type Types = keyof typeof PromptTypesMap;

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { t } = useLang();
  return (
    <Fragment>
      <ProFormRadio.Group
        label={t('flowCanvas.type')}
        name="type"
        initialValue={PromptTypes.Prompt}
        valueEnum={objectIteration(PromptTypesMap, t)}
        rules={[
          { required: true }
        ]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (!type) {
            return null;
          }
          return (
            <ProFormTextArea
              label={t(PromptTypesMap[type as Types])}
              name="text"
              fieldProps={{
                rows: 12
              }}
              rules={[
                { required: true }
              ]}
            />
          )
        }}
      </ProFormDependency>
    </Fragment>
  );
}

export default Form;