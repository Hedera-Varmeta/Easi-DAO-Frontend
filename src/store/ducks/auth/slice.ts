import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/index";
import { COOKIES, getCookies } from "@/utils/cookies";

export interface IAuth {
  isAuthenticator: string;
  login: boolean;
  type: "login" | "register" | null;
}

const initialState = {
  login: false,
  isAuthenticator: getCookies(COOKIES.token),
  type: null,
} as IAuth;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginModal: (
      state: IAuth,
      action: PayloadAction<undefined | [IAuth["login"], IAuth["type"]]>
    ) => {
      if (action.payload === undefined) {
        return {
          ...state,
          login: !state.login,
          type: null,
        };
      }
      return {
        ...state,
        login: action.payload[0],
        type: action.payload[1],
      };
    },
    setIsAuthenticator: (
      state: IAuth,
      action: PayloadAction<IAuth["isAuthenticator"]>
    ) => {
      return {
        ...state,
        isAuthenticator: action.payload,
      };
    },
  },
});

export const { toggleLoginModal, setIsAuthenticator } = authSlice.actions;

export const getLoginState = (state: RootState) => state.auth.login;
export const getTypeLoginState = (state: RootState) => state.auth.type;
export const getIsAuthenticator = (state: RootState) =>
  state.auth.isAuthenticator;

export default authSlice.reducer;
