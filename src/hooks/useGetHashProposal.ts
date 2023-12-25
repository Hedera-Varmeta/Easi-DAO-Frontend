import { callQueryHederaSmc } from "@/api/contract";
import { StandardGovernor__factory } from "@/contracts/types";
import { decodeApiResult } from "@/utils/common";

export const useGetHashProposal = (gas: number) => {
  const getHashPropposal = async (
    addressArr: string[],
    encodeArr: Uint8Array[],
    valuesArr: number[],
    encodeTitle: Uint8Array,
    governorAddress: string
  ) => {
    if (gas) {
      const standardGovernor = new StandardGovernor__factory();
      const encodeData = standardGovernor.interface.encodeFunctionData(
        "hashProposal",
        [addressArr, valuesArr, encodeArr, encodeTitle]
      );

      const { result } = await callQueryHederaSmc({
        block: "latest",
        data: encodeData,
        estimate: false,
        from: "0x000000000000000000000000000000000046d649",
        gas: 120000,
        gasPrice: 10000,
        to: governorAddress,
        value: 0,
      });

      return Uint8Array.from(
        result
          .slice(2) // remove 0x
          .match(/.{1,2}/g)
          .map((byte: any) => parseInt(byte, 16))
      );
    }
  };

  return {
    getHashPropposal,
  };
};
