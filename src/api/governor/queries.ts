import { IPaginationRequest } from "./../types";
import { useQuery, UseQueryOptions } from "react-query";
import {
  getListGovernorFields, getListGovernors,
  getListGovernorSettings,
  getListGovernorType,
  getListVoteFields,
} from "./request";
import {
  IGetListGovernorsParams,
  IListGorvernorFieldsParams,
  IListGorvernorSettingsParams,
  IListGovernorField, IListGovernors,
  IListGovernorSetting,
  IListGovernorType,
} from "./types";

export const useGetListGovernorType = (
  params: IPaginationRequest,
  option?: UseQueryOptions<IListGovernorType, Error>
) => {
  return useQuery<IListGovernorType, Error>(
    "/nfts/homepage",
    () => getListGovernorType(params),
    option
  );
};

export const useGetListGovernorSettings = (
  params: IListGorvernorSettingsParams,
  option?: UseQueryOptions<IListGovernorSetting, Error>
) => {
  return useQuery<IListGovernorSetting, Error>(
    ["/governors/settings", params],
    () => getListGovernorSettings(params),
    option
  );
};

export const useGetListGovernorFields = (
  params: IListGorvernorFieldsParams,
  option?: UseQueryOptions<IListGovernorField, Error>
) => {
  return useQuery<IListGovernorField, Error>(
    ["/governors/field", params],
    () => getListGovernorFields(params),
    option
  );
};

export const useGetListVoteFields = (
  params: IListGorvernorFieldsParams,
  option?: UseQueryOptions<IListGovernorField, Error>
) => {
  return useQuery<IListGovernorField, Error>(
    ["/governors/vote-field", params],
    () => getListVoteFields(params),
    option
  );
};

export const useGetListGovernors = (
    params: IGetListGovernorsParams,
    option?: UseQueryOptions<IListGovernors, Error>
) => {
  return useQuery<IListGovernors, Error>(
      ["/governors/list", params],
      () => getListGovernors(params),
      option
  );
};
