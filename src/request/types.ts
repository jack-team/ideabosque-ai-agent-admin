export type BaseRequestOptions = {
  baseUrl: string;
  apiKey: string;
  partId: string;
  endpointId: string;
}

export type GraphqlPayload = {
  query: string;
  variables?: Record<string, any>;
  camelize?: boolean;
}

export type ErrorType = {
  errorMessage: string;
  errorType: string;
  requestId: string;
}

export type GraphqlResultType<T = any> = {
  error: string | ErrorType;
  data?: T;
  errors?: Array<{
    message: string;
  }>
};

export type SplitPageResult<D = any> = {
  data: D;
  total: number;
  current: number;
  pageSize: number;
};

export type QueryResult<D = any> = D extends any[] ? SplitPageResult<D> : D;