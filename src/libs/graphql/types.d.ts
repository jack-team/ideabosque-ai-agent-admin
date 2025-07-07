import type { AxiosRequestHeaders } from 'axios';

export type GraphqlRequestHeaders = (
  headers: AxiosRequestHeaders
) => Promise<Record<string, any>>;

export type GraphqlRequestOptions = {
  baseUrl?: string;
  apiKey?: string;
  namespace: string;
  headers?: GraphqlRequestHeaders;
}

export type ErrorType = {
  errorMessage: string;
  errorType: string;
  requestId: string;
}

export type GraphqlResultType<T = any> = {
  error: string | ErrorType;
  data?: T;
} & Partial<GenerateQueryResult>; 
