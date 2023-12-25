import { COOKIES, getCookies, removeCookies } from "@/utils/cookies";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL, isServer } from "utils/constants";
import { IError, ISuccessResponse } from "./types";

export const request = axios.create({
  baseURL: API_URL,
});

const URL = ["/user/logout"];

const handleError = (err: AxiosError<IError>) => {
  const data = err?.response;

  // Logout
  if (data?.status === 401 || data?.status === 403) {
    removeCookies(COOKIES.token);
    removeCookies(COOKIES.user);
    if (!isServer) {
      location.href = "/";
    }
  }
  return Promise.reject(data?.data);
};

const handleSuccess = (res: AxiosResponse<ISuccessResponse>) => {
  if (res.data?.meta?.code < 200 && res.data?.meta?.code > 299) {
    return Promise.reject(res.data);
  }
  if (res.config.url === URL[0]) {
    removeCookies(COOKIES.token);
    removeCookies(COOKIES.user);
    if (!isServer) {
      location.href = "/";
    }
  }
  const result = res.data;
  if (result?.meta?.pagination) {
    result.data = {
      list: result.data,
      pagination: result?.meta?.pagination,
    };
  }

  return result as any;
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getCookies(COOKIES.token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
