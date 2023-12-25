import { useEffect, useState, useCallback } from "react";
import { BladeSigner, HederaNetwork } from "@bladelabs/blade-web3.js";
import { HEDERA_CONFIG, NETWORK_TYPE, SIGNATURE_TEXT } from "@/utils/constants";
import toast from "react-hot-toast";
import { loadLocalData } from "@/utils/json";
import { useMutation } from "react-query";
import {
  ILoginResponse,
  IRegisterHederaRequest,
  loginHedera,
  registerHedera,
} from "@/api/user";
import { setIsAuthenticator } from "@/store/ducks/auth/slice";
import { useAppDispatch } from "./useRedux";
import { COOKIES, setCookies } from "@/utils/cookies";
import { IError } from "@/api/types";
import { convertHederaAccountIdToEvmAddress } from "@/utils/common";
import { PrivateKey } from "@hashgraph/sdk";
export type BladeAccountId = string;
export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME = HEDERA_CONFIG.name;

// const testSignature = () => {
//   const privateKeyED = PrivateKey.generate();
//   const publicKeyED = privateKeyED.publicKey;
//   console.log(privateKeyED.toString());
//   console.log(publicKeyED.toString(), "public");
//   const messageBytes = Buffer.from(SIGNATURE_TEXT as string, "utf8");

//   const sign = privateKeyED.sign(messageBytes);
//   console.log(sign);
// };

const BLADE_SIGNER_PARAMS = {
  network:
    NETWORK_TYPE === "testnet" ? HederaNetwork.Mainnet : HederaNetwork.Testnet,
  dAppCode: BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
};
const bladeSigner = new BladeSigner();

const useBladeWallet = () => {
  const [bladeAccountId, setBladeAccountId] = useState<BladeAccountId>("");

  const dispatch = useAppDispatch();

  const { mutate: login } = useMutation(loginHedera, {
    onSuccess: (data: ILoginResponse) => {
      toast.success(" Login Successfully !!!");
      dispatch(setIsAuthenticator(data.token));
      setCookies(COOKIES.token, data.token);
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const { mutate: register } = useMutation(registerHedera, {
    onSuccess: () => {
      toast.success(" Register Successfully !!!");
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const clearConnectedBladeWalletData = useCallback(() => {
    localStorage.removeItem(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);
    setBladeAccountId("");
  }, [setBladeAccountId]);

  const connectBladeWallet = useCallback(
    async (type: "login" | "register") => {
      let loggedId = "";
      const mutate = type === "register" ? register : login;
      try {
        await bladeSigner.createSession(BLADE_SIGNER_PARAMS);
        loggedId = bladeSigner.getAccountId().toString();
        console.log(loggedId, "haha");
        const splitAccoutId = loggedId
          .split(".")
          .map((item: string) => Number(item));
        const request: IRegisterHederaRequest = {
          address: convertHederaAccountIdToEvmAddress(
            splitAccoutId[0],
            splitAccoutId[1],
            splitAccoutId[2]
          ),
          accountId: loggedId,
          signature: "signature",
          publicKey: "Default Public Key",
          message: SIGNATURE_TEXT as string,
          type: 2, // 1 is signature, 2 is no signature
        };
        mutate(request);
      } catch (e) {
        if (typeof e === "function") {
          const { message } = e();

          toast.error(message);
        } else if (typeof e === "string") {
          toast.error(e);
        } else if (e instanceof Error) {
          toast.error(e.message);
        }
      } finally {
        if (!loggedId) {
          toast.error("Cannot find connected account id in Blade Wallet!");
        } else {
          if (!loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME)) {
            toast.success("Blade Wallet has been connected!");
          }
          setBladeAccountId(loggedId);
          localStorage.setItem(
            BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
            JSON.stringify({
              bladeAccountId: loggedId,
            })
          );
        }
      }
    },
    [setBladeAccountId]
  );

  const initializeBladeWallet = useCallback(async () => {
    const wasConnected = loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);
    if (wasConnected) {
      await connectBladeWallet("login");
    }
  }, [connectBladeWallet]);

  useEffect(() => {
    // initializeBladeWallet();
  }, [initializeBladeWallet]);

  useEffect(() => {
    // bladeSigner.onAccountChanged(() => connectBladeWallet("login"));
  }, [connectBladeWallet]);

  return {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  };
};

export default useBladeWallet;
