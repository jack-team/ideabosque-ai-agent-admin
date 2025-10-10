import { type FC } from 'react';
import { type UploadFile, message } from 'antd';
import { useSafeState, useMemoizedFn } from 'ahooks';
import ProUploadFile, { uploadFile } from '@/components/UploadFile';

type UploadInputProps = {
  namespace: string;
  value?: string;
  onChange?: (value?: string) => void;
}

const UploadInput: FC<UploadInputProps> = (props) => {
  const { value, onChange, namespace } = props;
  //@ts-ignore
  const [files, setFiles] = useSafeState<UploadFile[]>([{ name: value }]);

  const onUpload = useMemoizedFn(async (files: UploadFile[]) => {
    const [file] = files;
    file.status = 'uploading';
    setFiles(files);

    try {
      const objectKey = await uploadFile(file, namespace);
      file.status = 'done';
      onChange?.(objectKey);
      message.success('File uploaded successfully.');
    } catch (err) {
      file.status = 'error';
      message.error('File upload failed.');
    } finally {
      setFiles([file]);
    }
  });

  return (
    <ProUploadFile
      value={files}
      onChange={onUpload}
    />
  );
}

export default UploadInput;