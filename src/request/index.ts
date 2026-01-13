import Axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios';
import humps from 'humps';
import type { BaseRequestOptions, GraphqlPayload, GraphqlResultType, QueryResult } from './types';
import { ResultError } from './result';
import { getOperationName } from './helper';

export class BaseRequest {
  private baseUrl: string;
  private apiKey: string;
  private partId: string;
  private namespace: string;
  private endpointId: string;
  private axios: AxiosInstance;

  private get apiUrl() {
    return [this.baseUrl, 'beta/core', this.endpointId].join('/');
  }

  constructor(namespace: string, options: BaseRequestOptions) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.apiKey;
    this.partId = options.partId;
    this.namespace = namespace;
    this.endpointId = options.endpointId;

    this.send = this.send.bind(this);
    this.graphql = this.graphql.bind(this);

    this.axios = Axios.create({
      baseURL: this.apiUrl,
      headers: {
        'x-api-key': this.apiKey,
        'part-id': this.partId
      }
    });

    this.axios.interceptors.response.use(
      this.parseSuccess,
      this.parseError
    );
  }

  // 解析成功数据
  private parseSuccess = async (result: AxiosResponse) => {
    const data = result.data as GraphqlResultType;

    let errorCode = "10001";
    const errors = data.errors;

    let resultError = data.error;

    if (!resultError && errors?.length) {
      resultError = errors[0].message;
    }

    if (!resultError) {
      return Promise.resolve(data.data);
    }

    if (typeof resultError !== "string") {
      errorCode = resultError.errorType;
      resultError = resultError.errorMessage;
    }

    return Promise.reject(new ResultError(errorCode, resultError));
  };

  //解析错误数据
  private parseError = (result: AxiosError) => {
    if (result.response) {
      return this.parseSuccess(result.response);
    } else {
      const code = result.status;
      const message = result.message;
      return Promise.reject(new ResultError(code!, message));
    }
  };

  private send<D = any>(payload: GraphqlPayload) {
    return this.axios.post(`/${this.namespace}`, payload) as Promise<D>;
  }

  // 发送graphql请求
  public async graphql<D = any>(payload: GraphqlPayload) {
    const { camelize = true, ...rest } = payload;
    const operation = getOperationName(rest.query);
    const result = await this.send(rest);
    const data = result?.[operation];
    const list = data?.[operation];

    // 分页数据
    if (Array.isArray(list)) {
      data.data = list;
      data.current = data.pageNumber;
      delete data[operation];
      delete data['pageNumber'];
    }

    let processData = data;

    if (camelize) {
      processData = humps.camelizeKeys(data);
    }
    
    console.log('processData:', processData);
    return processData as QueryResult<D>;
  }
}

