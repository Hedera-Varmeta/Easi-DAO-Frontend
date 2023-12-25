import Avatar from "@/components/Avatar";
import Tag from "@/components/Tag";
import { formatNumber } from "@/utils/common";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import useDaoActiveProposal, { ProposalLists } from "hooks/useDaoStatus";
import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";

type Props = {
  title: string;
  logo: string;
  createdAt: number;
  voteType: string;
  totalProposals: number;
  totalMembers: number;
  totalVotes: number;
  governorAddress?: string;
  proposalLists?: ProposalLists;
};

const DaoItem = ({
  title,
  logo,
  createdAt,
  voteType,
  totalMembers,
  totalProposals,
  totalVotes,
  governorAddress,
  proposalLists,
}: Props) => {
  const isErc20 = useMemo(() => {
    return voteType === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [voteType]);

  const { state } = useDaoActiveProposal({ governorAddress, proposalLists });

  return (
    <Stack
      width="100%"
      // border="1px solid #EAECF0"
      // borderRadius="10px"
      p="20px"
      // bgcolor="#fff"
      // boxShadow="rgba(0, 0, 0, 0.078) 0px 30px 90px"
      // boxShadow="var(--box-shadow-container)"
      sx={{
        position: "relative",
        cursor: "pointer",
        backdropFilter: "blur(20px)",
        transition: "all 0.4s linear",
        footer: {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "0 20px",
          transform: "translateY(calc(35px))",
          opacity: 0,
          visibility: "hidden",
          backgroundColor: "#fff",
          height: "35px",
          borderRadius: " 0 0 10px 10px",
          display: "flex",
          alignItems: "center",
          border: "1px solid #EAECF0",
          borderTop: 0,
          transition:
            "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease 0.1s, background-color 0.4s ease",

          ".footer__box": {
            "&:first-child": {
              opacity: 0,
              visibility: "hidden",
              transform: "translateY(-10px)",
              transition:
                "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease",
            },
          },
        },

        "&:before": {
          content: "''",
          position: "absolute",
          zIndex: -1,
          border: "1px solid #EAECF0",
          boxShadow: "var(--box-shadow-container)",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          // height: "calc(100% + 35px)",
          bgcolor: "#fff",
          borderRadius: "10px",
          transition: "height 0.4s ease",
        },

        "&:hover": {
          "&:before": {
            boxShadow: "rgba(0, 0, 0, 0.078) 0px 30px 90px",
            transition: "height 0.4s ease",
            height: "calc(100% + 35px)",
            // boxShadow: "var(--box-shadow-container)",
            // background:
            //   "radial-gradient(circle, rgba(211,174,241,0.09569765406162467) 0%, rgba(196,126,249,0.07889093137254899) 38%, rgba(238,129,201,0.08729429271708689) 65%, rgba(230,161,229,0.08729429271708689) 100%)",
          },

          footer: {
            transition:
              "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease 0.1s, background-color 0.4s ease",
            maxHeight: "fit-content",
            opacity: 1,
            bgcolor: "var(--secondary-color)",
            visibility: "visible",

            ".footer__box": {
              "&:first-child": {
                opacity: 1,
                visibility: "visible",
                transform: "translateX(0)",
                transition:
                  "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease",
              },
            },
          },
        },
      }}
      gap="10px"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Stack gap="20px" flex={1} overflow="hidden">
            <Stack direction="row" alignItems="center" spacing="10px">
              <Avatar username={title} avatarUrl={logo} />
              <Stack gap="5px">
                <Box flex={1} overflow="hidden">
                  <Typography
                    variant="h6"
                    noWrap
                    textOverflow="ellipsis"
                    textAlign="left"
                  >
                    {title}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing="10px">
                  <Tag
                    bgcolor={
                      isErc20 ? "var(--primary-color)" : "var(--blue-color-70)"
                    }
                    title={isErc20 ? "ERC20" : "ERC721"}
                    textColor="#fff"
                    size="xs"
                  />
                  {state && (
                    <Tag
                      bgcolor="#def1db"
                      textColor="#22bb33"
                      title="Active Proposal"
                      // textColor="var(--primary-color)"
                      size="xs"
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              spacing="10px"
              justifyContent="space-around"
            >
              <Stack alignItems="center">
                <Typography fontSize={18} fontWeight="bold">
                  {formatNumber(totalProposals, 0)}
                </Typography>
                <Typography color="var(--text-des-color)" fontSize={12}>
                  Proposals
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontSize={18} fontWeight="bold">
                  {formatNumber(totalMembers, 0)}
                </Typography>
                <Typography color="var(--text-des-color)" fontSize={12}>
                  Members
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontSize={18} fontWeight="bold">
                  {formatNumber(totalVotes, 0)}
                </Typography>
                <Typography color="var(--text-des-color)" fontSize={12}>
                  Voters
                </Typography>
              </Stack>
            </Stack>
            <footer>
              <Stack
                direction="row"
                justifyContent="flex-end"
                width="100%"
                className="footer__box"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="5px"
                  bgcolor="#fff"
                  p="3px 5px"
                  borderRadius="3px"
                  boxShadow="var(--box-shadow-container)"
                >
                  <AccessTimeIcon sx={{ fontSize: "14px" }} />
                  <Typography fontSize={12}>
                    {dayjs(createdAt).format("MMMM D, YYYY")}
                  </Typography>
                </Stack>
              </Stack>
            </footer>
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Stack>
  );
};

export default DaoItem;
