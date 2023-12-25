import { Pagination } from "@/types/util.types";

export interface IExampleTypeRequest {}

export interface IGovernorType {
  createdAt: string;
  id: number;
  typeDescription: string;
  typeName: string;
  typeStatus: string;
  updatedAt: string;
}
export interface IListGovernorType {
  list: IGovernorType[];
  meta: Pagination;
}

export interface IListGorvernorSettingsParams {
  typeId: number;
}

export interface IGovernorSetting {
  createdAt: string;
  id: number;
  settingDescription: string;
  settingName: "ERC20VotesStandard" | "ERC721VotesStandard";
  typeId: number;
  typeStatus: string;
  updatedAt: string;
}
export interface IListGovernorSetting {
  list: IGovernorSetting[];
  meta: Pagination;
}

export interface IListGorvernorFieldsParams {
  settingId: number;
}

export interface IGetListGovernorsParams {
  name?: string;
  address?: string;
  role?: string;
  page?: number;
  limit?: number;
  status: number;
}

export interface IGovernorField {
  createdAt: string;
  fieldDescription: string;
  fieldName: string;
  fieldValue: string;
  id: number;
  settingId: number;
  settingName: string;
  updatedAt: string;
  fieldPlaceholder: string;
}

export interface IListGovernorField {
  list: IGovernorField[];
  meta: Pagination;
}

export interface IGovernorRequest {
  name: string;
  address: string;
  role: string;
  settingId: number;
  typeId: number;
  timelockDeterministic: string;
  voteToken: string;
  timelockMinDelay: number;
  predictTreasury: string;
}

export interface IGovernorResponse {
  name: string;
  address: string;
  role: string;
  typeId: number;
  settingId: number;
  createdAt: number;
  updatedAt: number;
  id: number;
}

export interface IDAORequest {
  daoName: string;
  daoDescription: string;
  governorId: number;
  logo?: File;
}

export interface IGovernorsValueRequest {
  fieldValue: number;
  fieldId: number;
  governorId: number;
}

export interface IGovernorVoteRequest {
  fieldName: string;
  fieldValue: string;
  fieldDescription: string;
  settingId: number;
}

export interface IGovernor {
  id: number;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  timelockDeterministic: string | null;
  voteToken: string | null;
  typeName: string;
  settingName: string;
}

export interface IListGovernors {
  list: IGovernor[];
  meta: Pagination;
}
