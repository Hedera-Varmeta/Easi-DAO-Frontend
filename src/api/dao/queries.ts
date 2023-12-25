import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  checkDelegate,
  getDAODetail,
  getDAOMembers,
  getDAOValues,
  getDAOVoteValues,
  getExploreDAO,
  getListDAO,
  getListDelegate,
  getListTypeTreasury,
  getMyDAO,
  getMyMemberDAOs,
  getTopDelegateDAOs,
  getTreasuries,
  transactionHistory
} from "./request";
import {
  IDAODetailResponse,
  IDelegateInfo,
  IGetDaoMemberParams,
  IGetListExploreDao,
  IGetListExploreDaoResponse,
  IGetMyDAOParams,
  IGetMyMemberDAOParams,
  IGetTopDelegateDAOParams,
  IListDaoMember,
  IListDAOResponse,
  IListRecievedDelegate,
  IListTopDelegateDao,
  IListTypeTreasury,
  IListTypeTreasuryParams,
  IListValue,
  IRecievedDelegateParams,
  ITransactionHistoryParams,
  ITransactionHistoryRes,
  ITreasuriesParams,
  ITreasuriesRes,
  IValueParams
} from "./types";

export const useGetListDAO = (
  params: IGetMyDAOParams,
  option?: UseQueryOptions<IListDAOResponse, Error>
) => {
  return useQuery<IListDAOResponse, Error>(
    ["/dao/list", params],
    () => getListDAO(params),
    option
  );
};

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

export const useGetMyDAO = (
  params: IGetMyDAOParams,
  option?: UseQueryOptions<IListDAOResponse, Error>
) => {
  return useQuery<IListDAOResponse, Error>(
    ["/dao/my-daos", params],
    () => getMyDAO(params),
    option
  );
};

export const useGetExploreDAO = (
  params: IGetListExploreDao,
  option?: UseQueryOptions<IGetListExploreDaoResponse, Error>
) => {
  return useQuery<IGetListExploreDaoResponse, Error>(
    ["/dao/list", params],
    () => getExploreDAO(params),
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

export const useGetListDAOMember = (
  params: IGetDaoMemberParams,
  option?: UseQueryOptions<IListDaoMember, Error>
) => {
  return useQuery<IListDaoMember, Error>(
    ["/dao/list-members", params],
    () => getDAOMembers(params),
    option
  );
};

export const useGetMyMemberDAOs = (
  params?: IGetMyMemberDAOParams,
  option?: UseQueryOptions<IListDAOResponse, Error>
) => {
  return useQuery<IListDAOResponse, Error>(
    ["/dao/my-member-daos", params],
    () => getMyMemberDAOs(params),
    option
  );
};

export const useGetTopDelegateDAOs = (
  params?: IGetTopDelegateDAOParams,
  option?: UseQueryOptions<IListTopDelegateDao, Error>
) => {
  return useQuery<IListTopDelegateDao, Error>(
    ["/dao/top-delegate", params],
    () => getTopDelegateDAOs(params),
    option
  );
};

export const useGetInfinityDelegateDAOs = (
  paramsInfinite: IGetTopDelegateDAOParams,
  option?: UseInfiniteQueryOptions<IListTopDelegateDao, Error>
) => {
  return useInfiniteQuery<IListTopDelegateDao, Error>(
    [`/dao/infinite-top-delegate`, paramsInfinite],
    ({ pageParam = 1 }) => {
      const params: IGetTopDelegateDAOParams = {
        ...paramsInfinite,
        page: pageParam,
      };
      return getTopDelegateDAOs(params);
    }
  );
};

export const useCheckDelegate = (
  params: { daoId: number },
  option?: UseQueryOptions<IDelegateInfo, Error>
) => {
  return useQuery<IDelegateInfo, Error>(
    ["/dao/check-delegate", params],
    () => checkDelegate(params),
    option
  );
};

export const useGetRecievedDelegate = (
  params: IRecievedDelegateParams,
  option?: UseQueryOptions<IListRecievedDelegate, Error>
) => {
  return useQuery<IListRecievedDelegate, Error>(
    ["/dao/received-delegate", params],
    () => getListDelegate(params),
    option
  );
};

export const useGetListTypeTreasury = (
  params: IListTypeTreasuryParams,
  option?: UseQueryOptions<IListTypeTreasury, Error>
) => {
  return useQuery<IListTypeTreasury, Error>(
    ["/dao/type-treasury", params],
    () => getListTypeTreasury(params),
    option
  );
};

export const useGetTreasuries = (
  params: ITreasuriesParams,
  option?: UseInfiniteQueryOptions<ITreasuriesRes, Error>
) => {
  return useInfiniteQuery<ITreasuriesRes, Error>({
    queryKey: ["/dao/list-treasury-transactions", params],
    queryFn: ({pageParam = 1}) => getTreasuries({
      ...params,
      page: pageParam
    }),
    ...option,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage === lastPage.pagination.totalPages)
        return false;
      return lastPage.pagination.currentPage + 1;
    },
  });
};

export const useGetTransactionHistory = (
  params: ITransactionHistoryParams,
  option?: UseQueryOptions<ITransactionHistoryRes, Error>
) => {
  return useQuery<ITransactionHistoryRes, Error>(
    ["/dao/list-treasury-transactions", params],
    () => transactionHistory(params),
    option
  );
};
