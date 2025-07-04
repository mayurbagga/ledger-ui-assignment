import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with base configuration
export const AXIOS_INSTANCE = Axios.create({
  baseURL: '/api', // This will be handled by MSW
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Custom instance function for Orval
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }: AxiosResponse<T>) => data);

  // @ts-expect-error - Adding cancel method to promise for SWR compatibility
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// Type for the custom instance
export type ErrorType<Error> = AxiosResponse<Error>;

// Default export for convenience
export default customInstance; 