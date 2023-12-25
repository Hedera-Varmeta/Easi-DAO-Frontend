import { IExampleTypeRequest } from './types';
import { request } from 'api/axios';

export const getExample = async (params: IExampleTypeRequest) => {
  const res = await request({
    method: 'get',
    url: `/example`,
    params: params,
  });

  return res.data.items;
};
