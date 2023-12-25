import { useQuery, UseQueryOptions } from "react-query";
import { userInfo } from "./request";
import { ILoginResponse } from "./types";

export const useGetUserInfo = (
  option?: UseQueryOptions<ILoginResponse, Error>
) => {
  return useQuery<ILoginResponse, Error>(
    "/user/info",
    userInfo,
    option
  );
};
