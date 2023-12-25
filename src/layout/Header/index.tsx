import { routeEnums } from "@/types/routes";
import { Box, Stack, Toolbar } from "@mui/material";
import { useHeader } from "hooks/useHeader";
import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "./components/ConnectWallet";
import HeaderLink from "./components/HeaderLink";
import { ContainerHeader, StyledAppBar } from "./styled";

export const Header = () => {
  const { scroll } = useHeader();

  return (
    <>
      <StyledAppBar position={scroll ? "fixed" : "absolute"}>
        <Box className="container-header">
          <ContainerHeader>
            <Toolbar sx={{ height: "100%" }}>
              <Stack
                display="flex"
                justifyContent="space-between"
                direction="row"
                alignItems="center"
                width="100%"
                gap="80px"
              >
                <Link href={routeEnums.home}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      priority
                      src="/images/logo-text.png"
                      alt="logo"
                      width={92.25}
                      height={55.5}
                    />
                  </Box>
                </Link>
                <Stack
                  spacing={4}
                  display={{ md: "flex", xs: "none" }}
                  justifyContent="flex-end"
                  alignItems="center"
                  direction="row"
                  flex={1}
                  gap="24px"
                >
                  <HeaderLink />
                  <ConnectWallet />
                </Stack>
              </Stack>
            </Toolbar>
          </ContainerHeader>
        </Box>
      </StyledAppBar>
    </>
  );
};
