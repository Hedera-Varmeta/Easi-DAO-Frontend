import { useQuery, UseQueryOptions } from 'react-query';
import { getExample } from './request';
import { IExampleTypeResponse } from './types';

export const useFeaturedNFT = (option?: UseQueryOptions<IExampleTypeResponse, Error>) => {
  return useQuery<IExampleTypeResponse, Error>('/nfts/homepage', getExample, option);
};
