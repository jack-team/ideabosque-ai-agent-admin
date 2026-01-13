import { apiCore, apiMarketing } from '@/utils/api';
import { presignedUploadQl, presignedAwsS3UrlQl } from '@/graphql/upload';

type PresignedUploadUrlParams = {
  objectKey: string;
}

type PresignedAwsS3UrlParams = {
  expiration: number;
  objectKey: string;
}

type UploadResult = {
  url: string;
}

// 获取上传文件的预上传地址
export const presignedUploadUrlApi = async (params: PresignedUploadUrlParams) => {
  const result = await apiMarketing.graphql<UploadResult>({
    query: presignedUploadQl,
    variables: params
  });
  return result.url;
}


// 获取文件地址
export const presignedAwsS3UrlApi = async (params: PresignedAwsS3UrlParams) => {
  const result = await apiCore.graphql<UploadResult>({
    query: presignedAwsS3UrlQl,
    variables: {
      ...params,
      clientMethod: 'get_object'
    }
  });
  return result.url;
}