import { useMemo, Fragment, type FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { InboxOutlined } from '@ant-design/icons';
import { type UploadFile, Upload, message } from 'antd';
import type { BeforeUpload } from './types';
import { uploadFile } from './helper';
import styles from './styles.module.less';

type UploadFileProps = {
  maxCount?: number;
  accept?: string;
  disbaled?: boolean;
  value?: UploadFile[];
  children?: any;
  onChange?: (files: UploadFile[]) => void;
}

export { uploadFile };

const ProUploadFile: FC<UploadFileProps> = (props) => {
  let {
    onChange,
    children,
    maxCount = 1,
    disbaled = false,
    value: files = [],
    accept = '.png,.jpg,.pdf'
  } = props;

  const hintText = useMemo(() => {
    const acceptText = accept.split(',').join(' ');
    return `Accepts ${acceptText}`;
  }, [accept]);

  const beforeUpload: BeforeUpload = useMemoizedFn((file) => {
    if (maxCount === 1) {
      files = [file];
    } else {
      if (files.length < maxCount) {
        files = [...files, file];
      } else {
        const error = `At most ${maxCount} files can be selected.`;
        message.error(error);
        return false;
      }
    }
    onChange?.(files);
    return false;
  });

  const onRemove = useMemoizedFn((file: UploadFile) => {
    const index = files.indexOf(file);
    const newFileList = files.slice();
    newFileList.splice(index, 1);
    onChange?.(newFileList);
  });

  return (
    <Upload.Dragger
      accept={accept}
      multiple={false}
      fileList={files}
      maxCount={maxCount}
      onRemove={onRemove}
      disabled={disbaled}
      beforeUpload={beforeUpload}
      className={styles.container}
    >
      {children || (
        <Fragment>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag to add file.
          </p>
          <p className="ant-upload-hint">
            {hintText}
          </p>
        </Fragment>
      )}
    </Upload.Dragger>
  );
}

export default ProUploadFile;