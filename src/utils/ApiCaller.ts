import axios, { AxiosHeaders } from "axios";

type METHOD_TYPE = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const defaultURL = process.env.REACT_APP_BASE_URL;

type ApiCallerType = {
  method: METHOD_TYPE;
  endpoint: string;
  headers?: AxiosHeaders;
  params?: Object;
  body?: Object;
};

// This is config default for axios caller
const ApiCaller = async ({ method, endpoint, headers, params = {}, body = {} }: ApiCallerType) => {
  return await axios({
    method,
    url: defaultURL + endpoint,
    headers,
    params,
    data: body,
  });
};

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${LocalStorage.get("token")}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export const get = async ({ endpoint, params, headers }: Omit<ApiCallerType, "method" | "body">) => {
  return await ApiCaller({ method: "GET", endpoint, headers, params });
};

export const post = async ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return await ApiCaller({ method: "POST", endpoint, headers, params, body });
};

export const put = async ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return await ApiCaller({ method: "PUT", endpoint, headers, params, body });
};

export const patch = async ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return await ApiCaller({ method: "PATCH", endpoint, headers, params, body });
};

export const remove = async ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return await ApiCaller({ method: "DELETE", endpoint, headers, params, body });
};
