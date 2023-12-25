export interface IRegisterHederaRequest {
  address: string;
  accountId: string;
  signature: string;
  publicKey: string;
  message: string;
  type: number; // 1 is signature, 2 is no signature
}

export interface IRegisterHederaResponse {}

export interface ILoginResponse {
  id: number;
  username: string;
  avatarUrl: any;
  firstName: any;
  lastName: any;
  dateOfBirth: any;
  phone: any;
  createdAt: string;
  updatedAt: string;
  wallet: string;
  accountId: string;
  status: string;
  type: string;
  token: string;
}

export interface IUpdateUserInfoRequest {
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  image: string;
  dateOfBirth: string;
}
