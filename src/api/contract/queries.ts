import { useQuery, UseQueryOptions } from "react-query";
import {
  getDAODetail,
  getDAOValues,
  getDAOVoteValues,
  getMyDAO,
  IDAODetailResponse,
  IListValue,
  IValueParams,
} from "../dao";

import { AccountInfo, ContractInfo, IGetListDAO, ISmcQueryData } from "./types";
import { callQueryHederaSmc, getHederaAccountInfo, getHederaContractInfo } from "./request";

export const useGetDAODetail = (
  id: number,
  option?: UseQueryOptions<IDAODetailResponse, Error>
) => {
  return useQuery<IDAODetailResponse, Error>(
    ["/dao/item", id],
    () => getDAODetail(id),
    option
  );
};

export const useGetVoteValue = (
  params: IValueParams,
  option?: UseQueryOptions<IListValue, Error>
) => {
  return useQuery<IListValue, Error>(
    ["/dao/values", params],
    () => getDAOVoteValues(params),
    option
  );
};

export const useGetValues = (
  params: IValueParams,
  option?: UseQueryOptions<IListValue, Error>
) => {
  return useQuery<IListValue, Error>(
    ["/dao/vote-values", params],
    () => getDAOValues(params),
    option
  );
};

export const useGetHederaSmc = (
  payload: ISmcQueryData,
  options?: UseQueryOptions<{ result: string }, Error>
) => {
  return useQuery<{ result: string }, Error>(
    ["/contracts/call", payload],
    () => callQueryHederaSmc(payload),
    options
  );
};

export const useGetHederaContractInfo = (
  evmContractAddress: string,
  options?: UseQueryOptions<ContractInfo, Error>
) => {
  return useQuery<ContractInfo, Error>(
    ["/contracts", evmContractAddress],
    () => getHederaContractInfo(evmContractAddress),
    options
  );
};


export const useGetHederaAccountInfo = (
  evmAddress: string,
  options?: UseQueryOptions<AccountInfo, Error>
) => {
  return useQuery<AccountInfo, Error>(
    ["/accounts", evmAddress],
    () => getHederaAccountInfo(evmAddress),
    options
  );
};

