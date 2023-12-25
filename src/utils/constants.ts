export const __prod__ = process.env.NODE_ENV === "production";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isServer = typeof window === "undefined";

export const GOOGLE_ID =
  "360249142126-h7mujd5koqf27ilsqhjaie5rc85h97ga.apps.googleusercontent.com";

export const HEDERA_NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK;
export const SIGNATURE_TEXT = process.env.NEXT_PUBLIC_SIGNATURE_TEXT;
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY ?? "";
export const ACCOUNT_ID = process.env.NEXT_PUBLIC_ACCOUNT_ID ?? "";
export const GOVERNOR_CONTRACT_ID = "0.0.66510";

export const HEDERA_CONFIG = {
  name: `hedera`,
  description: "Description",
  icon: "/favicon.ico",
};

export const NETWORK_TYPE = "testnet";

export const HEDERA_URL = "https://testnet.mirrornode.hedera.com";
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const PARAMS_DEFINE = {
  releaseErc20: ["to", "amount", "tokenAddress"],
  releaseErc721: ["from", "to", "tokenId", "tokenAddress"],
  mintErc20: ["to", "amount"],
  mintErc721: ["to", "tokenUri"],
  releaseNativeToken: ["to", "amount"],
};

export enum SMC_FUNC {
  RELEASE_ERC20 = "releaseERC20",
  RELEASE_ERC721 = "releaseERC721",
  MINT = "mint",
  RELEASE_NATIVE_TOKEN = "releaseNativeToken",
  CUSTOM = "custom",
  NO_ACTION = "noAction",
}

export enum TOKEN_TYPE {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  NATIVE = "Native",
}

export const DAO_VOTE_TYPE = {
  ERC20_STANDARDS: "ERC20VotesStandard",
  ERC721_STANDARDS: "ERC721VotesStandard",
};

export const genSalt = () =>
  "hedera_" + (Math.random() + 1).toString(36).substring(7) + "_" + Date.now();

export const TransactionType = {
  all: -1,
  deposit: 2,
  withdraw: 1,
}