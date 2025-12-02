import { aiMarketing, agentCore } from '@/helper/request';
import { presignedUploadQl, presignedAwsS3UrlQl } from '@/qls/upload';

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

type PresignedAwsS3UrlResult = {
  presignedAwsS3Url: {
    url: string;
  }
}

type PresignedAwsS3UrlParams = {
  expiration: number;
  objectKey: string;
}

// 获取上传文件的预上传地址
export const presignedUploadUrlApi = async (params: PresignedUploadUrlParams) => {
  const result = await aiMarketing.graphql<PresignedUploadUrlResult>({
    query: presignedUploadQl,
    variables: params
  });
  return result.presignedUploadUrl.url;
}


// 获取文件地址
export const presignedAwsS3UrlApi = async (params: PresignedAwsS3UrlParams) => {
  const result = await agentCore.graphql<PresignedAwsS3UrlResult>({
    query: presignedAwsS3UrlQl,
    variables: {
      ...params,
      clientMethod: 'get_object'
    }
  });
  return result.presignedAwsS3Url.url;
}