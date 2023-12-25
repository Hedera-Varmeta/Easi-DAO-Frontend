import { IGetExploreDaoResponse } from "@/api/dao";
import { useGetUserInfo } from "@/api/user";
import { StandardGovernor__factory } from "@/contracts/types";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { HEDERA_URL } from "@/utils/constants";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useGetHashProposal } from "./useGetHashProposal";
import { useAppSelector } from "./useRedux";

export type ProposalLists = {
  valueArr: string;
  encodeArr: string;
  addressArr: string;
  proposalTitle: string;
}[];

type Params = {
  governorAddress?: string;
  proposalLists?: ProposalLists | null;
};

const useDaoActiveProposal = ({ proposalLists, governorAddress }: Params) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const [state, setState] = useState<boolean>(false);
  const { data: user } = useGetUserInfo({ enabled: !!isAuthenticator });

  const { getHashPropposal } = useGetHashProposal(200000);

  const standardGovernor = new StandardGovernor__factory();

  useEffect(() => {
    const getState = async () => {
      if (!governorAddress || !proposalLists) {
        setState(false);
        return;
      }
      const listStatus = await Promise.all(
        proposalLists.map(async (proposal) => {
          const encodeDataUnit8Array = JSON.parse(proposal.encodeArr)?.map(
            (item: string) => ethers.utils.arrayify(item)
          );

          const valueArray = JSON.parse(proposal.valueArr)?.map(
            (item: string | number) => {
              return Number(item);
            }
          );

          const hashProposal: any = await getHashPropposal(
            JSON.parse(proposal.addressArr),
            encodeDataUnit8Array,
            valueArray,
            ethers.utils.arrayify(
              ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(proposal.proposalTitle)
              )
            ),
            governorAddress //governor address
          );
          const dataEncode = standardGovernor.interface.encodeFunctionData(
            "state",
            [hashProposal]
          );
          if (!dataEncode) return false;

          const data = await fetch(`${HEDERA_URL}/api/v1/contracts/call`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              block: "latest",
              data: dataEncode,
              estimate: false,
              from: user?.wallet as string,
              gas: 120000,
              gasPrice: 10000,
              to: governorAddress as string,
              value: 0,
            }),
          })
            .then(async (res) => await res.json())
            .catch(() => null);
          if (data) {
            const hexState = data?.result;
            return parseInt(hexState, 16);
          }
          return 0;
        })
      );

      return setState(listStatus.some((item) => item == 1) ? true : false);
    };
    getState();
  }, [
    getHashPropposal,
    governorAddress,
    proposalLists,
    standardGovernor.interface,
    user?.wallet,
  ]);

  return useMemo(() => ({ state }), [state]);
};

export default useDaoActiveProposal;
