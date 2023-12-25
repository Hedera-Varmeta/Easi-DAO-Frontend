import {
  ERC20VotesStandard__factory,
  ERC721VotesStandard__factory,
  Treasury__factory,
} from "@/contracts/types";
import { SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import { Contract } from "ethers";
import { toast } from "react-hot-toast";

type TGetEncodeFunction = {
  actionName: string;
  data: any[];
  type: SMC_FUNC;
  tokenType: string;
};

export const useEncodeFunction = () => {
  const getEncodeFunction = (
    actionName: string,
    data: any[],
    type: SMC_FUNC,
    tokenType: string
  ) => {
    let factory;
    switch (type) {
      case SMC_FUNC.MINT:
        if (tokenType === TOKEN_TYPE.ERC20) {
          factory = new ERC20VotesStandard__factory();
        } else if (tokenType === TOKEN_TYPE.ERC721) {
          factory = new ERC721VotesStandard__factory();
        }
        break;
      default:
        factory = new Treasury__factory();
        break;
    }

    if (!factory) {
      toast.error("Not found Factory");
      return;
    }
    return factory.interface.encodeFunctionData(actionName, data);
  };

  const getEncodeFunctionCustomAbi = (
    actionName: string,
    abi: any[],
    contractAddress: string,
    data: any[]
  ) => {
    let factory = new Contract(contractAddress, abi);
    return factory.interface.encodeFunctionData(actionName, data);
  };

  return {
    getEncodeFunction,
    getEncodeFunctionCustomAbi,
  };
};
