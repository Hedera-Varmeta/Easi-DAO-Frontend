import { useState, useCallback, useEffect, useMemo } from "react";
import { HashConnect, HashConnectTypes } from "hashconnect";
import { HashConnectConnectionState } from "hashconnect/dist/types";
import { HEDERA_CONFIG, NETWORK_TYPE, SIGNATURE_TEXT } from "@/utils/constants";
import toast from "react-hot-toast";
import useHashConnectEvents from "./useHashConnectEvents";
import { useMutation } from "react-query";
import {
  ILoginResponse,
  IRegisterHederaRequest,
  loginHedera,
  registerHedera,
} from "@/api/user";
import {
  convertHederaAccountIdToEvmAddress,
  getAccountByAddressOrAccountId,
} from "@/utils/common";
import { COOKIES, setCookies } from "@/utils/cookies";
import { IError } from "@/api/types";
import { useAppDispatch } from "./useRedux";
import { setIsAuthenticator, toggleLoginModal } from "@/store/ducks/auth/slice";

export interface HashConnectState {
  availableExtension: HashConnectTypes.WalletMetadata;
  state: HashConnectConnectionState;
  topic: string;
  pairingString: string;
  pairingData: HashConnectTypes.SavedPairingData | null;
}

const HASHCONNECT_DEBUG_MODE = false;

const useHashPack = () => {
  const [hashConnect, setHashConnect] = useState<any>(null);
  const [hashConnectState, setHashConnectState] = useState<
    Partial<HashConnectState>
  >({});
  const dispatch = useAppDispatch();

  const { mutate: register } = useMutation(registerHedera, {
    onSuccess: () => {
      toast.success(" Register Successfully !!!");
      dispatch(toggleLoginModal());
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });
  const { mutate: login } = useMutation(loginHedera, {
    onSuccess: (data: ILoginResponse) => {
      toast.success(" Login Successfully !!!");
      dispatch(setIsAuthenticator(data.token));
      setCookies(COOKIES.token, data.token);
      dispatch(toggleLoginModal());
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const { isIframeParent } = useHashConnectEvents(
    hashConnect,
    setHashConnectState
  );
  const initializeHashConnect = useCallback(async () => {
    const temp = new HashConnect(HASHCONNECT_DEBUG_MODE);
    await temp.init(HEDERA_CONFIG, NETWORK_TYPE);
    setHashConnect(temp);
  }, []);

  useEffect(() => {
    initializeHashConnect();
  }, []);

  const disconnectFromHashPack = useCallback(async () => {
    if (hashConnectState.topic) {
      await hashConnect.disconnect(hashConnectState.topic);

      setHashConnectState((prev) => ({
        ...prev,
        pairingData: undefined,
      }));
      hashConnect.hcData.pairingData = [];

      if (isIframeParent) {
        await hashConnect.clearConnectionsAndData();
      }
    }
  }, [hashConnectState.topic, isIframeParent]);

  const connectToHashPack = useCallback(
    async (type: "login" | "register") => {
      try {
        if (!hashConnectState.availableExtension || !hashConnect) {
          throw new Error("Hashpack wallet is not installed!");
        }
        if (
          typeof hashConnect?.hcData?.pairingString === "undefined" ||
          hashConnect?.hcData?.pairingString === ""
        ) {
          throw new Error(
            "No pairing key generated! Initialize HashConnect first!"
          );
        }
        hashConnect.connectToLocalWallet();
        hashConnect.pairingEvent.once((data: any) => {
          const mutate = type === "register" ? register : login;
          const splitAccoutId = data.accountIds[0]
            .split(".")
            .map((item: string) => Number(item));
          (async () => {
            const wallet = await getAccountByAddressOrAccountId(
              data.accountIds[0]
            );
            const request: IRegisterHederaRequest = {
              address: wallet.evm_address,
              accountId: data.accountIds[0],
              signature: "signature",
              publicKey: data.metadata.encryptionKey,
              message: SIGNATURE_TEXT as string,
              type: 2, // 1 is signature, 2 is no signature
            };
            mutate(request);
          })();
        });
      } catch (e) {
        if (typeof e === "string") {
          toast.error(e);
        } else if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    },
    [hashConnectState.availableExtension]
  );

  // PROVIDER STATE
  return {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent,
  };
};

export default useHashPack;
