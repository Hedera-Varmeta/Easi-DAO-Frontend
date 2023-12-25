import { IError } from "@/api/types";
import { logout, useGetUserInfo } from "@/api/user";
import Avatar from "@/components/Avatar";
import { getIsAuthenticator, toggleLoginModal } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { shortenAddress } from "@/utils/common";
import {
  LogoutOutlined,
  RoofingOutlined,
  SettingsSuggestOutlined,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { HederaWalletsContext } from "context/HederaContext";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import {
  ConnectWalletStyled,
  ContainerSettings,
  OptionSetting,
} from "./styled";

const ConnectWallet = () => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data, isLoading: isGetUserInfo } = useGetUserInfo({
    enabled: !!isAuthenticator,
  });
  const dispatch = useAppDispatch();
  const { disconnectFromHashPack } = useContext(HederaWalletsContext);

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      toast.success(" Logout Successfully !!!");
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const onConnectWallet = async () => {
    if (!isAuthenticator) dispatch(toggleLoginModal([true, "login"]));
  };

  const onLogout = () => {
    disconnectFromHashPack();
    mutate();
  };

  return (
    <Stack direction="row" spacing="10px">
      <ContainerSettings>
        <ConnectWalletStyled onClick={onConnectWallet}>
          {!isAuthenticator ? (
            <Typography margin="auto" textAlign="center">
              Connect Wallet
            </Typography>
          ) : isGetUserInfo ? (
            <Stack justifyContent="center" direction="row" width="100%">
              <CircularProgress color="inherit" size={20} />
            </Stack>
          ) : (
            <Box display="flex" alignItems="center" width="100%">
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  mr: 1,
                  border: 0,
                  borderColor: "secondary.main",
                }}
                username={data?.accountId || ""}
                avatarUrl={data?.avatarUrl || ""}
              />
              <Stack spacing="2px" width="100%">
                <Typography fontSize={11} textAlign="center" fontWeight="bold">
                  {shortenAddress(data?.wallet)}
                </Typography>
                <Divider />
                <Typography fontSize={11} textAlign="center">
                  {data?.accountId}
                </Typography>
              </Stack>
            </Box>
          )}
        </ConnectWalletStyled>
        {isAuthenticator && !isGetUserInfo && (
          <OptionSetting>
            <ul>
              <li>
                <Link href={routeEnums.manageDAO} prefetch>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <RoofingOutlined fontSize="small" color="primary" />
                    <Typography color="primary">Your DAOs</Typography>
                  </Stack>
                </Link>
              </li>
              <li>
                <Link href={routeEnums.profile} prefetch>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <SettingsSuggestOutlined fontSize="small" color="primary" />
                    <Typography color="primary">Profile</Typography>
                  </Stack>
                </Link>
              </li>
              <li onClick={onLogout}>
                <Stack direction="row" alignItems="center" spacing="10px">
                  <LogoutOutlined fontSize="small" />
                  <Typography>Logout</Typography>
                </Stack>
              </li>
            </ul>
          </OptionSetting>
        )}
      </ContainerSettings>
    </Stack>
  );
};

export default ConnectWallet;
