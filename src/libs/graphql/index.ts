import axios, {
  type Axios,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import type {
  GraphqlRequestOptions,
  GraphqlRequestHeaders,
  GraphqlResultType,
} from "./types";
import { getUrlParams } from '@/utils';
import { ResultError } from "./result";

const defaultApiUrl = import.meta.env.ENV_API_URL;
const defaultApiKey = import.meta.env.ENV_API_KEY;
let defaultEndpoint = import.meta.env.ENV_API_ENDPOINT_ID;

let shop = getUrlParams('shop');

// 存在店铺，获取店铺名称作为 endpointid
if (shop) {
  defaultEndpoint = shop.replace('.myshopify.com', '');
}

const baseUrl = [defaultApiUrl, defaultEndpoint].join("/");

class GraphqlRequest {
  private readonly request: Axios;
  private readonly namespace: string;
  private readonly baseUrl = baseUrl;
  private readonly headers?: GraphqlRequestHeaders;

  constructor(options: GraphqlRequestOptions) {
    const { apiKey = defaultApiKey } = options;

    if (options.baseUrl) {
      this.baseUrl = options.baseUrl;
    }

    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: { ["x-api-key"]: apiKey },
    });

    this.headers = options.headers;
    this.namespace = options.namespace;
    this.send = this.send.bind(this);
    this.graphql = this.graphql.bind(this);
    this.request.interceptors.request.use(this.requestBefore);
    this.request.interceptors.response.use(this.parseSuccess, this.parseError);
  }

  private requestBefore = async (config: InternalAxiosRequestConfig) => {
    if (this.headers) {
      const extHeaders = await this.headers(config.headers);
      config.headers = Object.assign(config.headers, extHeaders);
    }
    return config;
  };

  private parseSuccess = async (result: AxiosResponse) => {
    const data = result.data as GraphqlResultType;

    let errorCode = "10001";
    const errors = data.errors;

    let resultError = data.error;

    if (!resultError && errors?.length) {
      resultError = errors[0].message;
    }

    if (!resultError) {
      return Promise.resolve(data.query ? data : data.data);
    }

    if (typeof resultError !== "string") {
      errorCode = resultError.errorType;
      resultError = resultError.errorMessage;
    }

    return Promise.reject(new ResultError(errorCode, resultError));
  };

  private parseError = (result: AxiosError) => {
    if (result.response) {
      return this.parseSuccess(result.response);
    } else {
      const code = result.status;
      const message = result.message;
      return Promise.reject(new ResultError(code!, message));
    }
  };

  public send<T = any>(data: Record<string, any>) {
    return this.request.post(`/${this.namespace}`, data) as Promise<T>;
  }

  public graphql<T = any>(payload: ServiceSendPayload) {
    return this.send<T>(payload);
  }
}

export default GraphqlRequest;
