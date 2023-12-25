import { callQueryHederaSmc } from "@/api/contract";
import { StandardGovernor__factory } from "@/contracts/types/factories/StandardGovernor__factory";

export const useProposalTime = (gas: number, from: string) => {
  const getProposalTime = async (
    proposalId: Uint8Array,
    governorAddress: string
  ) => {
    if (!from) return;
    if (gas) {
      const standardGovernor = new StandardGovernor__factory();
      const encodeDataDeadLine = standardGovernor.interface.encodeFunctionData(
        "proposalDeadline",
        [proposalId]
      );
      const encodeDataSnapshot = standardGovernor.interface.encodeFunctionData(
        "proposalSnapshot",
        [proposalId]
      );

      const { result: deadLine } = await callQueryHederaSmc({
        block: "latest",
        data: encodeDataDeadLine,
        estimate: false,
        from: "0x000000000000000000000000000000000046d649",
        gas: 120000,
        gasPrice: 10000,
        to: governorAddress,
        value: 0,
      });

      const { result: snapshot } = await callQueryHederaSmc({
        block: "latest",
        data: encodeDataSnapshot,
        estimate: false,
        from: "0x000000000000000000000000000000000046d649",
        gas: 120000,
        gasPrice: 10000,
        to: governorAddress,
        value: 0,
      });

      return {
        rsSnapShot: parseInt(snapshot, 16),
        rsDeadline: parseInt(deadLine, 16),
      };
    }
  };

  return {
    getProposalTime,
  };
};
