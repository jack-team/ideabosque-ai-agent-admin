import { apiCore, getSplitPageParams } from '@/utils/api';
import { threadListQuery, threadQuery } from '@/graphql/thread';
import type { ThreadDataType } from '@/typings/thread';

export const threadListApi = (params: SplitPageParams) => {
  return apiCore.graphql<ThreadDataType[]>({
    query: threadListQuery,
    variables: getSplitPageParams(params)
  });
}

export const threadApi = (params: {
  threadUuid: string;
}) => {
  return apiCore.graphql<ThreadDataType>({
    query: threadQuery,
    variables: params
  });
}