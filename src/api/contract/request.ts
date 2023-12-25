import { request } from "api/axios";
import { ISmcQueryData } from "./types";
import { HEDERA_URL } from "@/utils/constants";
import axios from "axios";

export const callQuerySmc = async (params: ISmcQueryData): Promise<any> => {
  const res: any = await request({
    method: "post",
    url: `/api/v1/contracts/call`,
    data: params,
  });

  return res;
};

export const callQueryHederaSmc = async (payload: ISmcQueryData) => {
  const { data } = await axios.post(`${HEDERA_URL}/api/v1/contracts/call`, payload);
  return data;
};

export const getHederaContractInfo = async (evmContractAddress: string) => {
  const { data } = await axios.get(`${HEDERA_URL}/api/v1/contracts/${evmContractAddress}`);
  return data;
};

export const getHederaAccountInfo = async (evmAddress: string) => {
  const { data } = await axios.get(`${HEDERA_URL}/api/v1/accounts/${evmAddress}`);
  return data;
};
