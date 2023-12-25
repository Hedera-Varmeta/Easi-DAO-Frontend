import { IGovernorField } from "@/api/governor";
import GroupIcon from "@mui/icons-material/Group";
import { Container, Stack, Typography } from "@mui/material";
import { memo } from "react";
import MintToken from "./MintToken";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  listVotes: IGovernorField[];
  governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard";
};

const MemberShipStep = ({ listVotes, governorSettingName }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack gap="40px">
          <Stack direction="row" gap="20px" justifyContent="center">
            <GroupIcon
              sx={{ fontSize: "60px", color: "var(--primary-color)" }}
            />
            <Stack direction="column">
              <Typography variant="h2">Define membership</Typography>
              <Typography fontSize={16} color="#6d6969" fontWeight={500}>
                Decide the type of voting your DAO uses
              </Typography>
            </Stack>
          </Stack>
          <Container maxWidth="md">
            <Stack
              gap="20px"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              border="1px solid #EAECF0"
              borderRadius="5px"
              p="40px"
              bgcolor="#fff"
            >
              <MintToken
                listVotes={listVotes}
                governorSettingName={governorSettingName}
              />
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(MemberShipStep);
