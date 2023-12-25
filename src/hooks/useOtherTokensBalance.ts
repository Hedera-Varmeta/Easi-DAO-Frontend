import { useGetHederaSmc } from '@/api/contract';
import { useGetUserInfo } from '@/api/user';
import { ERC1155__factory, ERC20VotesStandard__factory, ERC20__factory, ERC721VotesStandard__factory, ERC721__factory } from '@/contracts/types';
import { getIsAuthenticator } from '@/store/ducks/auth/slice';
import { DAO_VOTE_TYPE, TOKEN_TYPE } from '@/utils/constants';
import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

type Props = {
  ercType?: Omit<TOKEN_TYPE, "NATIVE">
  contractAddress?: string
  treasuryAddress?: string
  tokenId?:  string
}

const useOtherTokensBalance = ({ ercType, contractAddress, treasuryAddress, tokenId }: Props) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });

  const dataEncode = useMemo(() => {
    let factory;
    switch (ercType) {
      case TOKEN_TYPE.ERC20:
        factory = new ERC20__factory();
        break;
      case TOKEN_TYPE.ERC721:
        factory = new ERC721__factory();
        break;
      case TOKEN_TYPE.ERC1155:
        factory = new ERC1155__factory();
        break;
      default:
        break;
    }

    if (!factory || !treasuryAddress) return null;

    if (ercType === TOKEN_TYPE.ERC1155) {
      if (!tokenId) return null;

      return factory.interface.encodeFunctionData("balanceOf", [
        treasuryAddress,
        tokenId
    ])
    }
    return factory.interface.encodeFunctionData("balanceOf", [
      treasuryAddress,
    ]);
  }, [ercType, tokenId, treasuryAddress]);

  // API Get Balance
  const { data: balanceData, isLoading, ...res } = useGetHederaSmc(
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

  return { balanceData, ...res }
};

export default useOtherTokensBalance;