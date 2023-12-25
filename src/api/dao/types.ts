import { Pagination } from "@/types/util.types";
import { IPaginationRequest, IPaginationResponse } from "../types";

export interface IGetMyDAOParams {
  page: number;
  limit: number;
  status?: number;
}

export interface IGetMyMemberDAOParams {
  page: number;
  limit: number;
  daoName?: string;
  governorId?: string;
}

export interface IDAOResponse {
  createdAt: string;
  daoDescription: string;
  daoName: string;
  governorId: string;
  id: number;
  updatedAt: string;
  daoLogo: string;
  governorName: string;
  governorAddress: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  status: number;
  predictTreasury: string;
  totalVotes?: string;
  totalProposals: string;
  governorSettingName: string;
  totalVoters: string;
  totalVotePower: string;
  totalHolders: string;
  proposalLists: {
    valueArr: string;
    encodeArr: string;
    addressArr: string;
    proposalTitle: string;
  }[];
}
export interface IListDAOResponse {
  list: IDAOResponse[];
  pagination: IPaginationResponse;
}

export interface IDAODetailResponse {
  id: number;
  daoName: string;
  daoLogo: string;
  daoDescription: string;
  governorId: number;
  createdAt: string;
  updatedAt: string;
  governorName: string;
  governorAddress: string;
  governorSettingName: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  predictTreasury: string;
  userUsername: string;
  userAccountId: string;
  userAvatarUrl: string;
  userFirstName: string;
  userLastName: string;
  userStatus: string;
  userWallet: string;
  symbolToken: string;
}

export interface IValueParams {
  governorId: any;
  page?: number;
  limit?: number;
}
export interface IValueResponse {
  id: number;
  fieldValue: string;
  fieldId: number;
  createdAt: string;
  updatedAt: string;
  fieldName: string;
  settingId: number;
  settingName: string;
  governorName: string;
  fieldDescription: string;
  settingValue: string;
}
export interface IListValue {
  list: IValueResponse[];
  meta: any;
}

export interface IGetListExploreDao {
  page: number;
  limit: number;
  daoName: string | null | undefined;
  governorId: number | null | undefined;
}

export interface IGetExploreDaoResponse {
  id: number;
  daoName: string;
  daoDescription: string;
  governorId: number;
  createdAt: string;
  updatedAt: string;
  daoLogo: string;
  governorName: string;
  governorAddress: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  status: number;
  predictTreasury: string;
  totalVoters: string;
  totalProposals: string;
  governorSettingName: string;
  totalVotePower: string;
  totalHolders: string;
  proposalLists: {
    valueArr: string;
    encodeArr: string;
    addressArr: string;
    proposalTitle: string;
  }[];
}

export interface IGetListExploreDaoResponse {
  list: IGetExploreDaoResponse[];
  pagination: Pagination;
}

export interface IGetDaoMemberParams {
  id: number;
}

export interface IDaoMember {
  id: number;
  daoMemberId: number;
  daoName: string;
  daoDescription: string;
  createdAt: string;
  updatedAt: string;
  memberAddress: string;
  memberName: string;
  governorId: number;
  governorName: string;
  governorAddress: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  status: number;
  predictTreasury: string;
  memberUsername: string;
  memberAvatarUrl: string;
  memberFirstName: string;
  memberLastName: string;
  memberStatus: string;
  governorSettingName: string;
  memberAccountId: string;
}
export interface IListDaoMember {
  list: IDaoMember[];
  pagination: any;
}

export interface ITopDelegateDAO {
  daoId: number;
  daoName: string;
  daoDescription: string;
  governorId: number;
  governorName: string;
  governorAddress: string;
  governorSettingName: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  status: number;
  predictTreasury: string;
  totalUserDelegate: string;
  totalDelegate: string;
  totalBalance: string;
  username?: string;
  accountId?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  fullStatement?: string;
  wallet: string;
  latestFromUsers: {
    wallet?: string;
    username?: string;
    accountId?: string;
    avatarUrl?: string;
  }[];
}
export interface IListTopDelegateDao {
  list: ITopDelegateDAO[];
  pagination: any;
}
export interface IGetTopDelegateDAOParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBalance?: 1;
  id: number;
}
export interface IDelegatePayload {
  daoId: number;
  toAddress: string;
  balance: string;
}

export interface IRecievedDelegateParams {
  page: number;
  limit: number;
  daoName: string;
}
export interface IDelegateInfo {
  status: string;
  username: string;
  accountId: string;
  avatarUrl: any;
  firstName: any;
  lastName: any;
  daoId: number;
  daoName: string;
  daoDescription: string;
  governorId: number;
  daoLogo: string;
  address: string;
  balance: string;
  governorName: string;
  governorAddress: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  predictTreasury: string;
  governorSettingName: string;
  symbolToken: string;
}

export interface IRecievedDelegate {
  id: number;
  daoId: number;
  daoName: string;
  daoDescription: string;
  governorId: number;
  balance: string;
  createdAt: string;
  updatedAt: string;
  governorName: string;
  governorAddress: string;
  governorSettingName: string;
  timelockDeterministic: string;
  timelockMinDelay: string;
  voteToken: string;
  status: number;
  predictTreasury: string;
  fromUsername: string;
  fromAccountId: string;
  fromAvatarUrl: any;
  fromFirstName: any;
  fromLastName: any;
  fromWallet: string;
  toUsername: string;
  toAccountId: string;
  toAvatarUrl: any;
  toFirstName: any;
  toLastName: any;
  toWallet: string;
}

export interface IListRecievedDelegate {
  list: IRecievedDelegate[];
  pagination: Pagination;
}
export interface IListTypeTreasuryParams {
  page: number;
  limit: number;
  id?: number;
}

export interface ITypeTreasury {
  id: number;
  typeName: string;
}

export interface IListTypeTreasury {
  list: ITypeTreasury[];
  pagination: Pagination;
}

export interface ITokenImport {
  daoId: number;
  typeId: any;
  treasuryType: any;
  token: string;
  tokenName: string;
  tokenId?: string;
}

export interface ITreasuriesParams {
  page: number;
  limit: number;
  id?: number;
  daoId?: number;
  typeId?: number;
  tokenName?: string;
}

export interface ITreasury {
  daoId: string
  daoName: string | null
  id: number
  token  : string
  tokenName: string
  typeId: string
  typeName: string
  tokenId: string
}

export interface ITreasuriesRes {
  list: ITreasury[];
  pagination: Pagination;
}

export interface ITransactionHistoryParams {
  page: number;
  limit: number;
  token: string;
  type: number | undefined;
}

export interface ITransaction {
  id: number;
  fromAddress: string;
  toAddress: string;
  predictTreasury: string | null;
  amount: string;
  createdAt: string;
  updatedAt: string;
  tokenName: string;
  typeName: string;
}

export interface ITransactionHistoryRes {
  list: ITransaction[];
  pagination: Pagination;
}