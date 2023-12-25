import { useGetHederaSmc } from '@/api/contract';
import { useGetUserInfo } from '@/api/user';
import { ERC20__factory } from '@/contracts/types';
import { getIsAuthenticator } from '@/store/ducks/auth/slice';
import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

type Props = {
  contractAddress?: string
  enabled?: boolean
}

const useGetSymbol = ({ contractAddress, enabled = true }: Props) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });

  const dataEncode = useMemo(() => {
    const factory = new ERC20__factory();
    return factory.interface.encodeFunctionData("symbol");
  }, []);

  // API Get Balance
  const { data: symbol, isLoading } = useGetHederaSmc(
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
      enabled: !!dataEncode && !!userInfo?.wallet && !!contractAddress && enabled,
    }
  );

  return { symbol, isLoading }
};

export default useGetSymbol;