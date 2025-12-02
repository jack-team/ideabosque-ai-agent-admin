import { presignedAwsS3UrlApi } from '@/services/upload';
import db, { type AwsFileInfo } from './db';

const expiration = 24 * 60 * 60 * 6;

// 查询
export const getAwsFileInfo = async (key: string) => {
  const [result] = await db.urls.where('key').equals(key).toArray();

  if (result && Date.now() > result.expires) {
    await db.urls.where('key').equals(key).delete();
    return;
  }

  return result;
}

// 保存
export const saveAwsFileInfo = async (data: Omit<AwsFileInfo, 'id'>) => {
  const exit = !!await getAwsFileInfo(data.key);
  if (!exit) return db.urls.add(data);
}

// 获取 url 地址
export const getAwsFileUrl = async (key: string) => {
  const result = await getAwsFileInfo(key);
  if (result) return result.url;
  const url = await presignedAwsS3UrlApi({ expiration, objectKey: key });
  const expires = Date.now() + expiration * 1000 - 1000 * 60 * 5;
  await saveAwsFileInfo({ key, url, expires: expires });
  return url;
}