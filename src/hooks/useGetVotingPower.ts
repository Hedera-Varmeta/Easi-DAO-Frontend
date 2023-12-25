import { callQueryHederaSmc } from "@/api/contract";
import { StandardGovernor__factory } from "@/contracts/types";
import { decodeApiResult, getLastestBlock } from "@/utils/common";
import BigNumber from "bignumber.js";
import { formatEther } from "ethers/lib/utils";
import { useCallback } from "react";

export const useGetVotingPower = () => {
  const getVotingPower = useCallback(
    async (gas: number, account: string, governorAddress?: string) => {
      if (!account && !governorAddress) return;

      const resLastBlock = await getLastestBlock();
      const standardGovernor = new StandardGovernor__factory();
      const dataEncode = standardGovernor.interface.encodeFunctionData(
        "getVotes",
        [account, resLastBlock[0].number - 1]
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

      return result;
    },
    []
  );

  const getVotingPowerProposal = async (
    gas: number,
    account: string,
    block: number,
    governorAddress?: string
  ) => {
    const resLastBlock = await getLastestBlock();
    const standardGovernor = new StandardGovernor__factory();
    const dataEncode = standardGovernor.interface.encodeFunctionData(
      "getVotes",
      [
        account,
        resLastBlock[0].number < block ? resLastBlock[0].number - 1 : block,
      ]
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

    return result;

    // const rs = await transaction.execute(client);
    // return new BigNumber(Number(rs.getUint256(0)) || 0).valueOf();
  };

  return {
    getVotingPower,
    getVotingPowerProposal,
  };
};
