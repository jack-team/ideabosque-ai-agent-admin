import * as uuid from 'uuid';
import type { UploadFile } from 'antd';
import { presignedUploadUrlApi } from '@/services/upload';

export const uploadFile = async (file: File | UploadFile, contactUuid: string) => {
  const name = `${uuid.v4()}_${file.name}`;
  const objectKey = `${contactUuid}/${name}`;
  const url = await presignedUploadUrlApi({ objectKey });

  const result = await fetch(url, {
    method: 'PUT',
    redirect: 'follow',
    body: file as File,
    headers: { 'Content-Type': file.type! }
  });

  if (result.status === 200) {
    return Promise.resolve(objectKey);
  } else {
    return Promise.reject(new Error('Upload fail.'));
  }
}