export interface IGetListDAO {
  page: number;
  limit: number;
}

export interface ISmcQueryData {
  block: number | "latest" | "pending" | "earliest";
  data: any;
  estimate: boolean;
  from: string;
  gas: number;
  gasPrice: number;
  to: string;
  value: number;
}

export type ContractInfo = {
  admin_key: any;
  auto_renew_account: any;
  auto_renew_period: number;
  bytecode: string;
  contract_id: string;
  created_timestamp: string;
  deleted: false
  evm_address: string;
  expiration_timestamp: string;
  file_id: any;
  max_automatic_token_associations: number;
  memo: string;
  nonce: number;
  obtainer_id: any;
  permanent_removal: any;
  proxy_account_id: any;
  runtime_bytecode: string;
  timestamp: {
    from: string;
    to: any;
  }
}

export type AccountInfo = {
  account: string;
  alias: any
  auto_renew_period: number;
  balance: {
    balance: number;
    timestamp: string;
    tokens: any[];
  }
  timestamp: string;
  tokens: any[]
  created_timestamp: string;
  decline_reward: boolean;
  deleted: boolean;
  ethereum_nonce: number;
  evm_address: string;
  expiry_timestamp: string;
  key: any;
  links: {
    next: any;
  }
  max_automatic_token_associations: number;
  memo: string;
  pending_reward: number;
  receiver_sig_required: any;
  stake_period_start: any;
  staked_account_id: any;
  staked_node_id: any;
  transactions: any;
}