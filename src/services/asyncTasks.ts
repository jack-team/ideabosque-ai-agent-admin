import { apiCore, getSplitPageParams } from '@/utils/api';
import { asyncTaskListQuery } from '@/graphql/asyncTasks';
import type { AsyncTaskDataType } from '@/typings/asyncTask';

export const asyncTaskListApi = (params: SplitPageParams) => {
  return apiCore.graphql<AsyncTaskDataType[]>({
    query: asyncTaskListQuery,
    variables: getSplitPageParams(params)
  });
}
