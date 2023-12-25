import { request } from "api/axios";
import {
  ICreateProposal,
  IGetAllVoteProposal,
  IGetListProposalParams,
  IGetListProposalResponse,
  IListCommentProposalResponse,
  IListProposal,
  IListVoteOptions,
  IProposal,
  IProposalDetailParams,
  IProposalParams,
  IProposalVoteParams,
  IVoteParams,
  IVoteValueByIdResponse,
} from "./types";

export const getListProposalByDaoId = async (
  params: IProposalParams
): Promise<IListProposal> => {
  const res: any = await request({
    method: "get",
    url: `/proposal/list-proposal`,
    params: params,
  });

  return res.data;
};

export const getDetailProposal = async (
  params: IProposalDetailParams
): Promise<IProposal> => {
  const res: any = await request({
    method: "get",
    url: `/proposal/item`,
    params: params,
  });

  return res.data?.length > 0 ? res.data[0] : {};
};

export const getListVoteOptions = async (): Promise<IListVoteOptions> => {
  const res: any = await request({
    method: "get",
    url: `/proposal/list-vote-option`,
  });

  return res.data;
};

export const createVote = async (params: IVoteParams): Promise<any> => {
  const res: any = await request({
    method: "post",
    url: `/proposal/vote-option`,
    data: params,
  });

  return res.data;
};

export const getVoteById = async (params: {
  id: number;
}): Promise<IVoteValueByIdResponse> => {
  const res: any = await request({
    method: "get",
    url: `/proposal/vote`,
    params: params,
  });

  return res.data;
};

export const createProposalVote = async (
  params: IProposalVoteParams
): Promise<any> => {
  const res: any = await request({
    method: "post",
    url: `/proposal/vote-proposal`,
    data: params,
  });

  return res.data;
};

export const getListVoteProposal = async (
  params: IGetListProposalParams
): Promise<IGetListProposalResponse> => {
  const res = await request({
    method: "get",
    url: `/proposal/list-vote-proposal`,
    params: params,
  });

  return res.data as any;
};

export const getListAllVoteProposal = async (
  params: IGetAllVoteProposal
): Promise<IGetListProposalResponse> => {
  const res = await request({
    method: "get",
    url: '/proposal/all-vote-proposal',
    params: params,
  });

  return res.data as any;
};

export const getListCommentProposal = async (params: {
  proposalId: number;
}): Promise<IListCommentProposalResponse> => {
  const res = await request({
    method: "get",
    url: `/proposal/list-comment-proposal`,
    params: params,
  });

  return res.data as any;
};

export const createProposal = async (
  params: ICreateProposal
): Promise<IProposal> => {
  const res = await request({
    method: "post",
    url: `/proposal/create`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data as any;
};

export const checkVoted = async (params: {
  proposalId: number;
}): Promise<boolean> => {
  const res = await request({
    method: "get",
    url: `/proposal/check-vote/${params.proposalId}`,
  });

  return res.data as any;
};
