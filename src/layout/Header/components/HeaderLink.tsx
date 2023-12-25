import { getIsAuthenticator, toggleLoginModal } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import React from "react";

const MENU_ITEM = [
  { title: "Explore DAO", path: routeEnums.exploredDAO, checkLoggedIn: false },
  { title: "Add a DAO", path: routeEnums.createDAO, checkLoggedIn: true },
];

const HeaderLink = () => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { push, pathname } = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Stack flexDirection="row" gap="20px">
      {MENU_ITEM.map((item) => (
        <a
          key={item.path}
          onClick={() => {
            if (item.checkLoggedIn) {
              if (!!isAuthenticator) return push(item.path);
              else {
                return dispatch(toggleLoginModal([true, "login"]));
              }
            }
            return push(item.path);
          }}
        >
          <Typography
            fontWeight={800}
            fontSize={16}
            color={pathname === item.path ? "primary" : "var(--text-des-color)"}
          >
            {item.title}
          </Typography>
        </a>
      ))}
    </Stack>
  );
};

export default HeaderLink;
