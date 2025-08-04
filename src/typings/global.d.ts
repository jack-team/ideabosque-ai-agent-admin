declare type ServiceSendPayload = {
  query: string;
  variables?: Record<string, any>;
};

declare type SplitPageParams<Params extends {} = {}> = {
  pageNumber: number;
  limit: number;
} & Params;

declare type SplitPageResult<K extends keyof any, V> = Record<K, Record<K, V[]> & {
  total: number;
  pageNumber: number;
  pageSize: number;
}>;

declare type GenerateQueryParams = {
  name: string;
  type: 'Query' | 'Mutation';
}

declare type GenerateQueryResult = {
  query: string;
  function_name: string;
  operation_name: string;
}

declare type GlobalNoop = (this: any, ...args: any[]) => any;