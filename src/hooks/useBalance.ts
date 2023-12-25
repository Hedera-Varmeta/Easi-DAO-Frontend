import { useGetHederaSmc } from '@/api/contract';
import { useGetUserInfo } from '@/api/user';
import { ERC20VotesStandard__factory, ERC721VotesStandard__factory } from '@/contracts/types';
import { getIsAuthenticator } from '@/store/ducks/auth/slice';
import { DAO_VOTE_TYPE } from '@/utils/constants';
import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

type Props = {
  ercType?: typeof DAO_VOTE_TYPE[keyof typeof DAO_VOTE_TYPE]
  contractAddress?: string
}

const useBalance = ({ ercType, contractAddress }: Props) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });

  const dataEncode = useMemo(() => {
    let factory;
    switch (ercType) {
      case DAO_VOTE_TYPE.ERC20_STANDARDS: //mint tokens
        // case SMC_FUNC.RELEASE_ERC20:
        factory = new ERC20VotesStandard__factory();
        break;
      case DAO_VOTE_TYPE.ERC721_STANDARDS:
        factory = new ERC721VotesStandard__factory();
        break;
      default:
        break;
    }
    if (!factory || !userInfo?.wallet) return;
    return factory.interface.encodeFunctionData("balanceOf", [
      userInfo?.wallet,
    ]);
  }, [ercType, userInfo?.wallet]);

  // API Get Balance
  const { data: balanceData } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncode, //hàm get mà mình sẽ gọi
      estimate: false,
      from: userInfo?.wallet as string, //người gọi contract
      gas: 120000,
      gasPrice: 10000,
      to: contractAddress as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncode && !!userInfo?.wallet && !!contractAddress,
    }
  );

  return balanceData
};

export default useBalance;