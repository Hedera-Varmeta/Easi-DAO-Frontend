import {
  ILoginResponse,
  IRegisterHederaRequest,
  IRegisterHederaResponse,
  IUpdateUserInfoRequest,
} from "./types";
import { request } from "api/axios";

export const registerHedera = async (params: IRegisterHederaRequest) => {
  const res = await request({
    method: "post",
    url: `/user/register-hedera-wallet`,
    data: params,
  });

  return res.data;
};

export const loginHedera = async (params: IRegisterHederaRequest) => {
  const res = await request({
    method: "post",
    url: `/user/login-hedera-wallet`,
    data: params,
  });

  return res.data;
};

export const logout = async () => {
  const res = await request({
    method: "post",
    url: `/user/logout`,
  });
  return res.data;
};

export const userInfo = async (): Promise<ILoginResponse> => {
  const res = await request({
    method: "get",
    url: `/user/info`,
  });
  return res.data[0];
};

export const updateUserInfo = async (
  params: FormData
): Promise<ILoginResponse> => {
  const res = await request({
    method: "POST",
    url: `/user/update-info`,
    data: params,
  });
  return res.data[0];
};
