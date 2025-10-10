import { aiMarketing } from '@/helper/request';
import { presignedUploadQl } from '@/qls/upload';

type PresignedUploadUrlParams = {
  objectKey: string;
}

type PresignedUploadUrlResult = {
  presignedUploadUrl: {
    bucketName: string;
    expiration: string;
    objectKey: string;
    url: string;
  }
}

// 获取上传文件的预上传地址
export const presignedUploadUrlApi = async (params: PresignedUploadUrlParams) => {
  const result = await aiMarketing.graphql<PresignedUploadUrlResult>({
    query: presignedUploadQl,
    variables: params
  });
  return result.presignedUploadUrl.url;
}