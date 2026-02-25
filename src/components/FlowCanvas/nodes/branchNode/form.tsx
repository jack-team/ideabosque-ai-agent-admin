import { type FC, Fragment, useRef } from 'react';
import { Row, Col } from 'antd';
import * as uuid from 'uuid';
import {
  ProFormList,
  ProFormText,
  ProFormTextArea,
  type FormListActionType
} from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { t } = useLang();
  const actionRef = useRef<FormListActionType>(undefined);

  return (
    <Fragment>
      <ProFormText
        name="name"
        label={t('flowCanvas.name')}
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label={t('flowCanvas.text')}
        name="text"
        rules={[
          { required: false }
        ]}
      />
      <ProFormList
        label={t('flowCanvas.condition')}
        name="branch"
        copyIconProps={false}
        actionRef={actionRef}
        alwaysShowItemLabel
        className="custom-form-list"
        actionGuard={{
          beforeAddRow: () => {
            const id = uuid.v4();
            actionRef.current?.add({ id });
            return false;
          }
        }}
      >
        <ProFormText name="id" hidden />
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label={t('flowCanvas.label')}
              name="label"
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label={t('flowCanvas.value')}
              name="value"
              rules={[
                { required: true }
              ]}
            />
          </Col>
        </Row>
      </ProFormList>
    </Fragment>
  );
}

export default Form;