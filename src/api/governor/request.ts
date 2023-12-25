import { request } from "api/axios";
import { IPaginationRequest } from "../types";
import {
  IDAORequest,
  IGetListGovernorsParams,
  IGovernorRequest,
  IGovernorResponse,
  IGovernorsValueRequest,
  IGovernorVoteRequest,
  IListGorvernorFieldsParams,
  IListGorvernorSettingsParams,
  IListGovernorField,
  IListGovernors,
  IListGovernorSetting,
  IListGovernorType,
} from "./types";

export const getListGovernorType = async (
  params: IPaginationRequest
): Promise<IListGovernorType> => {
  const res = await request({
    method: "get",
    url: `/governors/type`,
    params: params,
  });

  return res.data as any;
};

export const getListGovernorSettings = async (
  params: IListGorvernorSettingsParams
): Promise<IListGovernorSetting> => {
  const res = await request({
    method: "get",
    url: `/governors/setting`,
    params: params,
  });

  return res.data as any;
};

export const getListGovernorFields = async (
  params: IListGorvernorFieldsParams
): Promise<IListGovernorField> => {
  const res = await request({
    method: "get",
    url: `/governors/field`,
    params: params,
  });

  return res.data as any;
};

export const getListVoteFields = async (
  params: IListGorvernorFieldsParams
): Promise<IListGovernorField> => {
  const res = await request({
    method: "get",
    url: `/governors/vote-field`,
    params: params,
  });

  return res.data as any;
};

export const createGovernor = async (
  params: IGovernorRequest
): Promise<IGovernorResponse> => {
  const res = await request({
    method: "post",
    url: `/governors/create`,
    data: params,
  });

  return res.data as any;
};

export const createDAO = async (
  params: IDAORequest
): Promise<IListGovernorField> => {
  const res = await request({
    method: "post",
    url: `/dao/create`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data as any;
};

export const addListValue = async (
  params: IGovernorsValueRequest[]
): Promise<IListGovernorField> => {
  const res = await request({
    method: "post",
    url: `/governors/all-value`,
    data: params,
  });

  return res.data as any;
};

export const addListVoteValue = async (
  params: IGovernorsValueRequest[]
): Promise<IListGovernorField> => {
  const res = await request({
    method: "post",
    url: `/governors/all-vote-value`,
    data: params,
  });

  return res.data as any;
};

export const getListGovernors = async (
  params: IGetListGovernorsParams
): Promise<IListGovernors> => {
  const res = await request({
    method: "get",
    url: `/governors/list`,
    params: params,
  });

  return res.data as any;
};
