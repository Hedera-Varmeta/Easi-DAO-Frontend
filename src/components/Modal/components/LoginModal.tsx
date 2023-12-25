import {
  getLoginState,
  getTypeLoginState,
  toggleLoginModal,
} from "@/store/ducks/auth/slice";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HederaWalletsContext } from "context/HederaContext";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import Image from "next/image";
import { useContext } from "react";
import toast from "react-hot-toast";
import BaseModal from "../BaseModal";

interface IFormInput {
  email: string;
  userName: string;
  agree: boolean;
  displayName?: string;
}

export const LoginModal = () => {
  const open = useAppSelector(getLoginState);
  const type = useAppSelector(getTypeLoginState);
  const dispatch = useAppDispatch();

  const {
    connectToHashPack,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  } = useContext(HederaWalletsContext);

  const onClose = () => {
    dispatch(toggleLoginModal());
  };

  const onHaskPack = () => {
    connectToHashPack(type as "login" | "register");
  };

  const onMetamask = () => {
    toast.success("Developing");
  };

  const onBladeWallet = () => {
    clearConnectedBladeWalletData();
    connectBladeWallet(type as "login" | "register");
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <Stack spacing={3} width="100%" alignItems="center" pb={2}>
        <Image
          priority
          src="/images/logo-text.png"
          alt="logo"
          width={119.925}
          height={72.15}
        />
        <Typography variant="h4" textAlign="center">
          Connect wallet
        </Typography>
        <Typography fontWeight={500} textAlign="center">
          Please select a wallet to connect to the site!
        </Typography>
        {/* <BoxWallet onClick={onMetamask}>
          <Typography variant="h6" color="primary">
            Metamask
          </Typography>
          <Image
            src="/images/wallet/metamask.png"
            alt="metamask"
            width={32}
            height={32}
          />
        </BoxWallet> */}
        <Stack justifyContent="center" alignItems="center" p="20px">
          <Stack
            alignItems="center"
            onClick={onHaskPack}
            gap="10px"
            sx={{ cursor: "pointer" }}
          >
            <Box
              width="60px"
              sx={{ aspectRatio: "1/1", position: "relative" }}
              borderRadius="5px"
              overflow="hidden"
              boxShadow="var(--box-shadow-container)"
            >
              <Image src="/images/wallet/hashpack.jpeg" alt="metamask" fill />
            </Box>
            <Typography variant="h6">HashPack</Typography>
          </Stack>
        </Stack>
        {/* <BoxWallet onClick={onBladeWallet}>
          <Typography variant="h6" color="primary">
            BladeWallet
          </Typography>
          <Image
            src="/images/wallet/bladewallet.png"
            alt="metamask"
            width={32}
            height={32}
          />
        </BoxWallet> */}
        {/* <Typography color="primary.main" textAlign="center">
          Dont have a wallet?{" "}
          <strong>
            <a href="https://ethereum.org/en/wallets" target="_blank">
              Learn more{" "}
            </a>
          </strong>
        </Typography> */}
      </Stack>
    </BaseModal>
  );
};
