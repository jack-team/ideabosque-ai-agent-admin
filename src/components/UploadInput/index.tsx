import { type FC } from 'react';
import { Modal } from 'antd';
import { type UploadFile, message } from 'antd';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { AwsImage } from '../AwsImage';
import ProUploadFile, { uploadFile } from '@/components/UploadFile';

type UploadInputProps = {
  namespace: string;
  value?: string;
  onChange?: (value?: string) => void;
}

const UploadInput: FC<UploadInputProps> = (props) => {
  const { value, onChange, namespace } = props;
  const [loading, setLoading] = useSafeState(false);
  const [reviewFile, setReviewFile] = useSafeState<UploadFile | null>(null);

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

  const handleClearReview = useMemoizedFn(() => {
    setReviewFile(null);
  })


  return (
    <>
      <ProUploadFile
        value={files}
        disbaled={loading}
        onChange={onUpload}
        onReview={setReviewFile}
      />
      <Modal
        footer={null}
        destroyOnHidden
        title="Review"
        open={!!reviewFile}
        rootClassName="shopify"
        onCancel={handleClearReview}
      >
        <div style={{ textAlign: 'center', padding: 32 }}>
          <AwsImage awsKey={reviewFile?.url!} />
        </div>
      </Modal>
    </>
  );
}

export default UploadInput;