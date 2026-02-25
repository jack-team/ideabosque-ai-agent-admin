import { type FC, Fragment } from 'react';
import { Row, Col } from 'antd';
import {
  ProFormSelect,
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import { useLang } from '@/hooks/useLang';
import { useFlowContext } from '../../hooks';
import type { FormProps } from '../types';

// 该组建可以提供给外部使用
const Form: FC<FormProps> = () => {
  const { t } = useLang();
  const { transformTools = [] } = useFlowContext();
  return (
    <Fragment>
      <ProFormSelect
        options={transformTools}
        label={t('flowCanvas.type')}
        name="type"
        rules={[
          { required: true }
        ]}
      />
      <ProFormTextArea
        label={t('flowCanvas.text')}
        name="text"
        rules={[
          { required: true }
        ]}
      />
      <ProFormList
        name="attrs"
        className="custom-form-list"
        label={t('flowCanvas.attributes')}
        creatorButtonProps={{
          creatorButtonText: t('flowCanvas.addAttribute')
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label="From"
              name="from"
              rules={[
                { required: true }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="To"
              name="to"
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