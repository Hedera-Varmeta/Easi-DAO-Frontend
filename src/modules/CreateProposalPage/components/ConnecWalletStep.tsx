import { useGetDAODetail, useGetValues } from "@/api/dao";
import { useGetUserInfo } from "@/api/user";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { formatEther } from "ethers/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useGetVotingPower } from "hooks/useGetVotingPower";
import { useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { RefValidateProposal } from "..";

type Props = {};

const ConnectWalletStep = (_props: Props, ref: Ref<RefValidateProposal>) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: DAO, isLoading: loadingDAO } = useGetDAODetail(Number(id));
  const governorId = DAO?.governorId;
  const [votingPower, setVotingPower] = useState(0);
  const { getVotingPower } = useGetVotingPower();
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const [threshHold, setThreshHold] = useState(0);
  const { data: userInfo, isLoading } = useGetUserInfo({
    enabled: !!isAuthenticator,
  });
  const { data: values, isLoading: loadingValues } = useGetValues({
    governorId,
    page: 1,
    limit: 10000,
  });

  useEffect(() => {
    (async () => {
      if (!DAO?.governorAddress) return;
      const res = await getVotingPower(
        100000,
        userInfo?.wallet || "",
        DAO?.governorAddress
      );
      if (DAO?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS)
        setVotingPower(+formatEther(BigNumber(res).toFixed()));
      else setVotingPower(Number(res));
    })();
  }, [
    DAO?.governorAddress,
    DAO?.governorSettingName,
    getVotingPower,
    userInfo,
  ]);

  // 2: loading, 1: true, 0: false
  const checkVotingPower = useMemo(() => {
    if (loadingValues || loadingDAO || isLoading) return 2;
    const threshHold = values?.list.find(
      (item) => item.fieldName === "initialProposalThreshold"
    )?.fieldValue;
    setThreshHold(Number(threshHold));
    if (!threshHold) return 1;
    if (BigNumber(votingPower).isGreaterThanOrEqualTo(BigNumber(threshHold)))
      return 1;
    return 0;
  }, [loadingValues, loadingDAO, isLoading, votingPower, values?.list]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (checkVotingPower === 0 || checkVotingPower === 2) return false;
      return votingPower >= threshHold;
    },
  }));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack
          gap="20px"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          border="1px solid #EAECF0"
          borderRadius="5px"
          p="40px"
          mt="40px"
          bgcolor="#fff"
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <CheckCircleIcon fontSize="medium" sx={{ color: "#9ACD32" }} />
              <Typography variant="h5">Connect Your Wallet & Login</Typography>
            </Stack>
            <List sx={{ marginBottom: 1, paddingLeft: 1 }}>
              <ListItem disablePadding>
                <CheckCircleIcon
                  sx={{ color: "#9ACD32", fontSize: 20, mr: 1 }}
                />
                <ListItemText>
                  <Typography variant="subtitle1">Wallet connected</Typography>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <CheckCircleIcon
                  sx={{ color: "#9ACD32", fontSize: 20, mr: 1 }}
                />
                <ListItemText>
                  <Typography variant="subtitle1">Logged In</Typography>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <CheckCircleIcon
                  sx={{ color: "#9ACD32", fontSize: 20, mr: 1 }}
                />
                <ListItemText>
                  <Typography variant="subtitle1">
                    Connect Chain selected
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                {checkVotingPower === 2 ? (
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      color: checkVotingPower === 0 ? "grey" : "#9ACD32",
                      fontSize: 20,
                      mr: 1,
                    }}
                  />
                )}
                <ListItemText>
                  <Typography variant="subtitle1">
                    You have {BigNumber(votingPower).toNumber()} voting power.
                    You {checkVotingPower === 1 ? "have" : "haven't"} reached
                    the proposal threshold of {threshHold}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default forwardRef(ConnectWalletStep);
