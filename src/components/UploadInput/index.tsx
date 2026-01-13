import { type FC } from 'react';
import { type UploadFile, App } from 'antd';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { getAwsFileUrl } from '../AwsImage/helper';
import { openUrl, isURL } from '@/utils';
import ProUploadFile, { uploadFile } from '@/components/UploadFile';
import { AwsImage } from '../AwsImage';
import styles from './styles.module.less';

type UploadInputProps = {
  namespace: string;
  value?: string;
  reviewImg?: boolean;
  onChange?: (value?: string) => void;
}

const UploadInput: FC<UploadInputProps> = (props) => {
  const { message } = App.useApp();
  const { value, onChange, namespace, reviewImg = false } = props;
  const [loading, setLoading] = useSafeState(false);

  const getFiles = useMemoizedFn(() => {
    if (!value) return [];
    return [{ name: value, url: value }] as UploadFile[]
  });

  const [files, setFiles] = useSafeState<UploadFile[]>(getFiles());

  useUpdateEffect(() => {
    if (value) setFiles(getFiles());
  }, [value]);

  const onUpload = useMemoizedFn(async (files: UploadFile[]) => {
    const [file] = files;
    file.status = 'uploading';
    setFiles(files);
    setLoading(true);

    try {
      const objectKey = await uploadFile(file, namespace);
      file.status = 'done';
      file.url = objectKey;
      onChange?.(objectKey);
      message.success('File uploaded successfully.');
    } catch (err) {
      file.status = 'error';
      message.error('File upload failed.');
    } finally {
      setFiles([file]);
      setLoading(false);
    }
  });

  const handleReview = useMemoizedFn(async (file: UploadFile) => {
    let url = file.url;
    if (url) {
      if (!isURL(url)) {
        const closeLoading = message.loading('Loading..');
        url = await getAwsFileUrl(url)
        closeLoading();
      }
      openUrl(url!);
    }
  });

  return (
    <>
      <ProUploadFile
        value={files}
        disbaled={loading}
        onChange={onUpload}
        onReview={handleReview}
      >
        {reviewImg && !!value && (
          <AwsImage
            awsKey={value}
            className={styles.review_img}
          />
        )}
      </ProUploadFile>
    </>
  );
}

export default UploadInput;