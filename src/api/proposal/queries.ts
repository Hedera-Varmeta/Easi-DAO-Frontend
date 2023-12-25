import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  IGetAllVoteProposal,
  IGetListProposalParams,
  IGetListProposalResponse,
  IListCommentProposalResponse,
  IListProposal,
  IListVoteOptions,
  IProposal,
  IProposalDetailParams,
  IProposalParams,
  IVoteValueByIdResponse,
} from "./types";
import {
  checkVoted,
  getDetailProposal,
  getListAllVoteProposal,
  getListCommentProposal,
  getListProposalByDaoId,
  getListVoteOptions,
  getListVoteProposal,
  getVoteById,
} from "./request";

export const useGetListAllVoteProposal = (
  params: IGetAllVoteProposal,
  option?: UseQueryOptions<IGetListProposalResponse, Error>
) => {
  return useQuery<IGetListProposalResponse, Error>(
    ["/proposal/all-vote-proposal", params],
    () => getListAllVoteProposal(params),
    option
  );
};

export const useGetListProposalByDaoId = (
  params: IProposalParams,
  option?: UseQueryOptions<IListProposal, Error>
) => {
  return useQuery<IListProposal, Error>(
    ["/proposal/list-proposal", params],
    () => getListProposalByDaoId(params),
    option
  );
};

export const useGetDetailProposal = (
  params: IProposalDetailParams,
  option?: UseQueryOptions<IProposal, Error>
) => {
  return useQuery<IProposal, Error>(
    ["/proposal/item", params],
    () => getDetailProposal(params),
    option
  );
};

export const useGetListVoteOptions = (
  option?: UseQueryOptions<IListVoteOptions, Error>
) => {
  return useQuery<IListVoteOptions, Error>(
    ["/proposal/list-options-proposal"],
    () => getListVoteOptions(),
    option
  );
};

export const useGetListVoteById = (
  params: { id: number },
  option?: UseQueryOptions<IVoteValueByIdResponse, Error>
) => {
  return useQuery<IVoteValueByIdResponse, Error>(
    ["/proposal/vote", params],
    () => getVoteById(params),
    option
  );
};

export const useGetListVoteProposal = (
  params: IGetListProposalParams,
  option?: UseQueryOptions<IGetListProposalResponse, Error>
) => {
  return useQuery<IGetListProposalResponse, Error>(
    ["/proposal/list-vote-proposal", params],
    () => getListVoteProposal(params),
    option
  );
};

export const useGetInfinityVotes = (
  paramsInfinite: IGetListProposalParams,
  option?: UseInfiniteQueryOptions<IGetListProposalResponse, Error>
) => {
  return useInfiniteQuery<IGetListProposalResponse, Error>(
    [`/dao/infinite-votes`, paramsInfinite],
    ({ pageParam = 1 }) => {
      const params: IGetListProposalParams = {
        ...paramsInfinite,
        page: pageParam,
      };
      return getListVoteProposal(params);
    }
  );
};

export const useGetListCommentProposal = (
  params: {
    proposalId: number;
  },
  option?: UseQueryOptions<IListCommentProposalResponse, Error>
) => {
  return useQuery<IListCommentProposalResponse, Error>(
    ["/proposal/list-comment-proposal", params],
    () => getListCommentProposal(params),
    option
  );
};

export const useCheckVoted = (
  params: { proposalId: number },
  option?: UseQueryOptions<boolean, Error>
) => {
  return useQuery<boolean, Error>(
    ["/proposal/checked", params],
    () => checkVoted(params),
    option
  );
};
