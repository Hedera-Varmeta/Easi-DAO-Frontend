import { AccountId } from "@hashgraph/sdk";
import axios from "axios";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { HEDERA_URL } from "./constants";
import { BigNumber } from "bignumber.js";
import bigDecimal from "js-big-decimal";

export const convertHederaAccountIdToEvmAddress = (
  shard: number,
  realm: number,
  account: number
): string => {
  const shardHex = shard.toString(16).padStart(2, "0");
  const realmHex = realm.toString(16).padStart(8, "0");
  const accountHex = account.toString(16).padStart(16, "0");

  const evmAddress = "0x" + shardHex + realmHex + accountHex;
  return evmAddress;
};

export function convertToEvmAddress(accountId?: string) {
  if (!accountId) return "";
  if (accountId.includes("0x")) return accountId;
  return "0x" + AccountId.fromString(accountId).toSolidityAddress();
}

export const convertToFormData = (data: Record<string, any>) => {
  const bodyFormData = new FormData();
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      // bodyFormData.append(key, value || '')
      /**
       * If value is file list
       */
      if (value instanceof Array && value[0] && value[0] instanceof Blob) {
        value.forEach((v) => {
          bodyFormData.append(key, v);
        });
      } else {
        bodyFormData.append(key, value === 0 ? 0 : value || "");
      }
    }
  }
  return bodyFormData;
};

export const parseDate = (timestamp: number) =>
  dayjs.unix(timestamp / 1000).format("YYYY-MM-DD HH:mm:ss");

export const numberToUint8Array = (number: number): Uint8Array => {
  const buffer = new ArrayBuffer(32); // Assuming the number is a 32-bit integer
  const view = new DataView(buffer);

  view.setUint32(0, number, false); // Set the number at the start of the buffer

  return new Uint8Array(buffer);
};

export const getAccountByAddressOrAccountId = async (value: any) => {
  const { data } = await axios.get(`${HEDERA_URL}/api/v1/accounts/${value}`);
  return data;
};

export const getLastestBlock = async () => {
  const { data } = await axios.get(
    `${HEDERA_URL}/api/v1/blocks?order=DESC&limit=1`
  );
  return data.blocks;
};

export function shortenString(str?: string, length = 10) {
  if (!str) return "";
  if (str?.length < 2 * length) return str;
  return `${str.substring(0, length)}...${str.substring(str.length - length)}`;
}

export function shortenAddress(address?: string, length = 5): string {
  if (!address) return "";
  try {
    return shortenString(address, length);
  } catch {
    throw new TypeError("Invalid input, address can't be parsed");
  }
}

export function shortenIfAddress(
  address?: string,
  length = 5
): string | undefined {
  if (!address) return "";
  if (address.includes("0x"))
    return address.length > 2 * length
      ? shortenAddress(address, length)
      : address;
  return address;
}

export function compactNumber(n: number, unit: number) {
  // const suffixes = ['', 'K', 'M', 'B', 'T'];
  // const tier = Math.floor(Math.log10(Math.abs(number)) / 3);
  // const scale = Math.pow(10, tier * 3);
  // const scaledNumber = number / scale;
  // const suffix = suffixes[tier];

  // return scaledNumber.toFixed(1).replace(/\.0$/, '') + suffix;

  if (n < 1e3) return +n.toFixed(unit);
  if (n >= 1e3 && n < 1e6) return prettyNumber(+BigNumber(n / 1e3).toFixed(unit)) + "K";
  if (n >= 1e6 && n < 1e9) return prettyNumber(+BigNumber(n / 1e6).toFixed(unit)) + "M";
  if (n >= 1e9 && n < 1e12) return prettyNumber(+BigNumber(n / 1e9).toFixed(unit)) + "B";
  if (n >= 1e12) return prettyNumber(+BigNumber(n / 1e12).toFixed(unit)) + "T";

  return prettyNumber(+n.toFixed(unit))
}

export function formatNumber(num: string | number, unit: number = 2) {
  if (typeof num === "string") num = Number(num);

  if (num === 0) return 0;
  return compactNumber(num, unit)
}

export function decodeApiResult(arrType: string[], result: any) {
  const coder = new ethers.utils.AbiCoder();
  return coder.decode(arrType, result);
}

export const prettyNumber = (num: number | string) => bigDecimal.getPrettyValue(num);
