import {
  IDAODetailResponse,
  IGetMyDAOParams,
  IGetListExploreDao,
  IGetListExploreDaoResponse,
  IListDAOResponse,
  IListValue,
  IValueParams,
  IGetDaoMemberParams,
  IListDaoMember,
  IGetMyMemberDAOParams,
  IGetTopDelegateDAOParams,
  IListTopDelegateDao,
  IDelegatePayload,
  IDelegateInfo,
  IRecievedDelegateParams,
  IListRecievedDelegate,
  IListTypeTreasuryParams,
  IListTypeTreasury,
  ITokenImport,
  ITreasuriesParams,
  ITransactionHistoryParams,
} from "./types";
import { request } from "api/axios";

export const getListDAO = async (
  params: IGetMyDAOParams
): Promise<IListDAOResponse> => {
  const res: any = await request({
    method: "get",
    url: `/dao/list`,
    params: params,
  });

  return res.data;
};

export const getDAODetail = async (id: number): Promise<IDAODetailResponse> => {
  const res = await request({
    method: "get",
    url: `/dao/item?id=${id}`,
  });

  return res.data;
};

export const getMyDAO = async (
  params: IGetMyDAOParams
): Promise<IListDAOResponse> => {
  const res: any = await request({
    method: "get",
    url: `/dao/my-daos`,
    params: params,
  });

  return res?.data;
};

export const getExploreDAO = async (
  params: IGetListExploreDao
): Promise<IGetListExploreDaoResponse> => {
  const res: any = await request({
    method: "get",
    url: `/dao/list`,
    params: params,
  });

  return res.data;
};

export const getDAOValues = async (
  params: IValueParams
): Promise<IListValue> => {
  const res: any = await request({
    method: "get",
    url: `/governors/value`,
    params: params,
  });

  return res.data;
};

export const getDAOVoteValues = async (
  params: IValueParams
): Promise<IListValue> => {
  const res: any = await request({
    method: "get",
    url: `/governors/vote-value`,
    params: params,
  });

  return res.data;
};

export const getDAOMembers = async (
  params: IGetDaoMemberParams
): Promise<IListDaoMember> => {
  const res: any = await request({
    method: "get",
    url: `/dao/membership-daos`,
    params: params,
  });

  return res.data;
};

export const getMyMemberDAOs = async (
  params?: IGetMyMemberDAOParams
): Promise<IListDAOResponse> => {
  const res: any = await request({
    method: "get",
    url: `/dao/my-member-daos`,
    params: params,
  });

  return res.data;
};

export const getTopDelegateDAOs = async (
  params?: IGetTopDelegateDAOParams
): Promise<IListTopDelegateDao> => {
  const res: any = await request({
    method: "get",
    url: `/dao/top-delegate`,
    params: params,
  });

  return res.data;
};

export const createDelegate = async (
  payload: IDelegatePayload
): Promise<any> => {
  const res: any = await request({
    method: "post",
    url: `/dao/delegate`,
    data: payload,
  });

  return res.data;
};

export const checkDelegate = async (payload: {
  daoId: number;
}): Promise<IDelegateInfo> => {
  const res: any = await request({
    method: "get",
    url: `/dao/check-delegate?id=${payload.daoId}`,
  });

  return res.data;
};

export const getListTypeTreasury = async (
  params: IListTypeTreasuryParams
): Promise<IListTypeTreasury> => {
  const res: any = await request({
    method: "get",
    url: `/dao/list-type-treasury`,
    params,
  });

  return res.data;
};

export const getListDelegate = async (
  params: IRecievedDelegateParams
): Promise<IListRecievedDelegate> => {
  const res: any = await request({
    method: "get",
    url: `/dao/received-delegate`,
    params
  });

  return res?.data;
};

export const importToken = async (
  payload: ITokenImport[]
): Promise<any> => {
  const res: any = await request({
    method: "post",
    url: `/dao/treasury/batch`,
    data: payload,
  });

  return res.data;
};

export const getTreasuries = async (
  params: ITreasuriesParams
): Promise<any> => {
  const res: any = await request({
    method: "get",
    url: `/dao/list-treasury`,
    params,
  });

  return res.data;
};

export const transactionHistory = async (
  params: ITransactionHistoryParams
): Promise<any> => {
  const res: any = await request({
    method: "get",
    url: "/dao/list-treasury-transactions",
    params,
  });

  return res.data;
};
