import { SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import { BigNumber } from "ethers";
import { FC, PropsWithChildren } from "react";

type Join<S1, S2> = S1 extends string
  ? S2 extends string
    ? `${S1}.${S2}`
    : never
  : never;

export type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? Join<K, Paths<T[K]>>
    : K;
}[keyof T];

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export type Pagination = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type InputFunctionABI = {
  name: string
  type: string
}

export type FunctionABI = {
  inputs: InputFunctionABI[],
  type: string
  name: string
}

export type TContentABI = {
  contractName?: string
  abi: FunctionABI[]
}

export type DataAction = {
  to?: string;
  amount?: number | BigNumber | string;
  from?: string;
  tokenId?: string;
  tokenAddress?: string;
  token?: string;
};

export interface IAction {
  address: string;
  type: SMC_FUNC;
  tokenType?: TOKEN_TYPE;
  values?: string | number;
  abiType?: string,
  abiContent?: TContentABI;
  functionName?: string
  data: DataAction;
}
