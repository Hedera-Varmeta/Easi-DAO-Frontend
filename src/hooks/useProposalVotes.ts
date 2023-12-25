import { callQueryHederaSmc } from "@/api/contract";
import { StandardGovernor__factory } from "@/contracts/types";
import { decodeApiResult } from "@/utils/common";
import { ethers } from "ethers";

export const useProposalVotes = (gas: number) => {
  const getProposalVotes = async (
    proposalId: Uint8Array,
    governorAddress: string
  ) => {
    if (gas) {
      const standardGovernor = new StandardGovernor__factory();
      const dataEncode = standardGovernor.interface.encodeFunctionData(
        "proposalVotes",
        [proposalId]
      );

      const { result } = await callQueryHederaSmc({
        block: "latest",
        data: dataEncode, //hàm get mà mình sẽ gọi
        estimate: false,
        from: "0x000000000000000000000000000000000046d649", //người gọi contract
        gas,
        gasPrice: 10000,
        to: governorAddress as string, //contract address
        value: 0,
      });

      const data = decodeApiResult(["uint256", "uint256", "uint256"], result);
      return {
        againstVotes: data[0],
        forVotes: data[1],
        abstainVotes: data[2],
      };
    }
  };

  return {
    getProposalVotes,
  };
};
