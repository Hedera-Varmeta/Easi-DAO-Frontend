import { IPaginationRequest, IPaginationResponse } from "./../types";
export interface IProposalParams {
  daoId: any;
}

export interface IProposal {
  id: number;
  daoId: string;
  proposalTitle: string;
  proposalDescription: string;
  proposalStatus: string;
  proposalVotesId: number;
  proposalCreatedAt: string;
  proposalUpdatedAt: string;
  daoName: string;
  daoDescription: string;
  governorAddress: string;
  voteToken: string;
  timelockDeterministic: string;
  addressArr: string;
  valueArr: string;
  encodeArr: string;
  data: string;
  imageUrl?: string | null;
  totalVotes: number;
  totalFor: number;
  totalAgainst: number;
  totalAbstain: number;
  userWallet: string;
  userAvatarUrl?: string;
  userAccountId: string;
  userUsername?: string;
  proposalId: string;
}

export interface IListProposal {
  list: IProposal[];
  pagination: any;
}

export interface IProposalDetailParams {
  id: number;
}

export interface IVoteOption {
  id: number;
  name: string;
  description: string;
  voteId: string;
  enumSC: any;
  voteName: string;
  voteDescription: string;
}

export interface IListVoteOptions {
  list: IVoteOption[];
  meta: any;
}

export interface IVoteParams {
  name: string;
  description: string;
  voteId: number;
}

export interface IVoteValueByIdResponse {
  voteData: IVoteDaum[];
  voteOptionData: IVoteList[];
}

export interface IVoteDaum {
  id: number;
  name: string;
  description: string;
}

export interface IVoteList {
  voteOptionId: number;
  voteOptionName: string;
  voteOptionDescription: string;
  voteId: string;
  enumSC: string;
}

export interface IProposalVoteParams {
  voteId: number;
  proposalId: number;
  voteOptionId: number;
  voteAddress: string;
  votePower: string;
  voteComment?: string | null;
}

export interface IGetAllVoteProposal {
  proposalId: number;
  limit?: number;
}

export interface IGetListProposalParams extends IPaginationRequest {
  proposalId: number;
  enumSC?: number;
}

export interface IProposalItemResponse {
  id: number;
  proposalId: string;
  voterId: string;
  voteAddress: string;
  voteOptionId: string;
  createdAt: string;
  updatedAt: string;
  proposalTitle: string;
  proposalDescription: string;
  proposalSnapshot: any;
  proposalDeadline: any;
  proposalStatus: string;
  voteName: string;
  voteDescription: string;
  voteOptionName: string;
  voteOptionDescription: any;
  votePower: string | number;
  enumSC: any;
  userUsername: string;
  userAvatarUrl: string
}

export interface IGetListProposalResponse {
  list: IProposalItemResponse[];
  pagination: IPaginationResponse;
}

export interface ICreateProposal {
  proposalTitle: string;
  proposalDescription: string;
  proposalStatus: string;
  daoId: number;
  addressArr: string;
  valueArr: string;
  encodeArr: string;
  data: string;
  image?: File;
  proposalId: string;
}

export interface ICommentProposalResponse {
  id: number;
  proposalId: string;
  voterId: string;
  voteAddress: string;
  voteOptionId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  voteComment: string;
  userWallet: string;
  userAccountId: string;
  userAvatarUrl: string;
  userUsername: string;
  proposalTitle: string;
  proposalDescription: string;
  proposalSnapshot: string | null;
  proposalDeadline: string | null;
  proposalStatus: string;
  calldatas: string | null;
  actionName: string | null;
  encodeData: string | null;
  imageUrl: string | null;
  metaData: string | null;
  proposalValues: string | null;
  addressArr: string;
  valueArr: string;
  encodeArr: string;
  data: string;
  voteName: string;
  voteDescription: string;
  voteOptionName: string;
  voteOptionDescription: string;
  enumSC: number;
}

export interface IListCommentProposalResponse {
  list: ICommentProposalResponse[];
  pagination: IPaginationResponse;
}
