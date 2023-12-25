import { callQueryHederaSmc } from "@/api/contract";
import { GovernorFactory__factory } from "@/contracts/types";
import { convertToEvmAddress, decodeApiResult } from "@/utils/common";
import {
  GOVERNOR_CONTRACT_ID
} from "@/utils/constants";
import { useEffect, useState } from "react";

export const usePredictTimelockDeterministicAddress = (
  gas: number,
  salt: Uint8Array
) => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    (async () => {
      if (gas) {
        const gorvernorFactory = new GovernorFactory__factory();
        const encodeData = gorvernorFactory.interface.encodeFunctionData(
          "predictTimelockDeterministicAddress",
          [salt]
        );

        const { result } = await callQueryHederaSmc({
          block: "latest",
          data: encodeData,
          estimate: false,
          from: "0x000000000000000000000000000000000046d649",
          gas: 120000,
          gasPrice: 10000,
          to: convertToEvmAddress(GOVERNOR_CONTRACT_ID),
          value: 0,
        });

        const data = decodeApiResult(["address"], result); // [timelockAddress]

        setAddress(data[0]);
      }
    })();
  }, [gas, salt]);
  return {
    address,
  };
};
