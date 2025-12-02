import { type FC } from 'react';
import { type UploadFile, message, App } from 'antd';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { getAwsFileUrl } from '../AwsImage/helper';
import { openUrl } from '@/utils'
import ProUploadFile, { uploadFile } from '@/components/UploadFile';

type UploadInputProps = {
  namespace: string;
  value?: string;
  onChange?: (value?: string) => void;
}

const UploadInput: FC<UploadInputProps> = (props) => {
  const { message } = App.useApp();
  const { value, onChange, namespace } = props;
  const [loading, setLoading] = useSafeState(false);

  const [files, setFiles] = useSafeState<UploadFile[]>((() => {
    return value ? [{ name: value, url: value }] as UploadFile[] : []
  })());

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
    if (file.url) {
      const closeLoading = message.loading('Loading..');
      openUrl(await getAwsFileUrl(file.url));
      closeLoading();
    }
  });

  return (
    <>
      <ProUploadFile
        value={files}
        disbaled={loading}
        onChange={onUpload}
        onReview={handleReview}
      />
    </>
  );
}

export default UploadInput;