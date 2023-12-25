import useHashPack, { HashConnectState } from "hooks/useHashPack";
import { ReactFCWithChildren } from "@/types/react";
import { HashConnect } from "hashconnect";
import { createContext, FC } from "react";
import useBladeWallet, { BladeAccountId } from "hooks/useBladeWallet";
import { BladeSigner } from "@bladelabs/blade-web3.js";

interface HederaWalletsContextType {
  hashConnect?: HashConnect;
  hashConnectState: Partial<HashConnectState>;
  connectToHashPack: (type: "login" | "register") => void;
  disconnectFromHashPack: () => void;
  isIframeParent: boolean;
  bladeSigner?: BladeSigner;
  bladeAccountId: BladeAccountId;
  connectBladeWallet: (type: "login" | "register") => void;
  clearConnectedBladeWalletData: () => void;
}

const HEDERA_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  hashConnectState: {},
  disconnectFromHashPack: () => undefined,
  connectToHashPack: () => undefined,
  isIframeParent: false,
  bladeSigner: undefined,
  bladeAccountId: "",
  connectBladeWallet: (type: "login" | "register") => undefined,
  clearConnectedBladeWalletData: () => undefined,
};

export const HederaWalletsContext = createContext(HEDERA_CONTEXT);

export const HederaWalletProvider: ReactFCWithChildren = ({ children }) => {
  const {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  } = useBladeWallet();

  const {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent,
  } = useHashPack();

  return (
    <HederaWalletsContext.Provider
      value={{
        bladeSigner,
        bladeAccountId,
        connectBladeWallet,
        clearConnectedBladeWalletData,
        hashConnect,
        hashConnectState,
        disconnectFromHashPack,
        connectToHashPack,
        isIframeParent,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
};

export default HederaWalletProvider;
