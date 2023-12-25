import { IError } from "@/api/types";
import { logout, useGetUserInfo } from "@/api/user";
import Avatar from "@/components/Avatar";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { shortenString } from "@/utils/common";
import { ExpandMoreOutlined, LogoutOutlined, RoofingOutlined, SettingsSuggestOutlined } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { HederaWalletsContext } from "context/HederaContext";
import { useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const { connectToHashPack, disconnectFromHashPack } =
    React.useContext(HederaWalletsContext);

  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      toast.success(" Logout Successfully !!!");
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const onLogout = () => {
    handleClose();
    disconnectFromHashPack();
    mutate();
  };

  const onRouter = (link: routeEnums) => {
    handleClose();
    router.push(link);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", cursor: 'pointer' }}>
        <Tooltip title="Account settings">
          <Stack onClick={handleClick}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              boxShadow: '0 0 0 .8px #8364e2,0 0 0 #8364e2,0 .8px .8px #8364e2',
              borderRadius: 1,
              width: 155,
              paddingX: 1,
              paddingY: 0.6,
            }}>
            <Avatar
              sx={{ width: 30, height: 30, mr: 1, border: 0, borderColor: "secondary.main" }}
              username={data?.accountId || ''}
              avatarUrl={data?.avatarUrl || ''}
            />
            <Typography>
              {shortenString(data?.accountId ?? 'loading...', 15)}
            </Typography>
            <ExpandMoreOutlined fontSize="small" color="disabled" />          </Stack>
        </Tooltip>
      </Box>
      {open && (
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top-end"
          transition
          disablePortal
          sx={{ zIndex: 100 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'right top',
                width: 153,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: 155,
                  filter: "drop-shadow(0px .5px 1px rgba(0,0,0,0.32))",
                  mt: 1.5,
                }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem onClick={() => onRouter(routeEnums.manageDAO)}>
                      <ListItemIcon>
                        <RoofingOutlined fontSize="small" />
                      </ListItemIcon> Your DAOs
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => onRouter(routeEnums.profile)}>
                      <ListItemIcon>
                        <SettingsSuggestOutlined fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                      <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </React.Fragment>
  );
};
