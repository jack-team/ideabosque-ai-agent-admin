import { type FC, Fragment } from 'react';
import { Row, Col } from 'antd';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { FileTypeMap } from '../../enum';
import { getFormNamePath } from '../../helper';
import styles from './styles.module.less';

const getName = (names: string[]) => {
  return getFormNamePath("uploader",  names);
}

const FileUploader: FC = () => {
  return (
    <Fragment>
      <div className={styles.title}>Uploader details</div>
      <ProFormText
        label="Upload CTA"
        name={getName(["cta"])}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="Upload description"
        name={getName(["description"])}
        rules={[
          { required: true }
        ]}
      />
      <ProFormSelect
        mode="multiple"
        label="Accepted file types"
        valueEnum={FileTypeMap}
      />
      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            label="Attribute name"
            name={getName(["attrName"])}
            rules={[
              { required: true }
            ]}
            extra="This name identifies the files uploaded by this component."
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Attribute type"
            name={getName(["attrType"])}
            rules={[
              { required: true }
            ]}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

export default FileUploader;